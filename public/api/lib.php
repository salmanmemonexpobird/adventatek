<?php
declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

mb_internal_encoding('UTF-8');

/* ---------- config ---------- */
function cfg(): array
{
    static $c = null;
    if ($c === null) {
        $file = getenv('ADVENTA_CONFIG') ?: __DIR__ . '/config.php';
        $c = is_file($file) ? (require $file) : [];
    }
    return $c;
}

/* ---------- responses ---------- */
function json_out(int $status, array $data): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(int $status, string $message): never
{
    json_out($status, ['ok' => false, 'message' => $message]);
}

/* ---------- request guards ---------- */
function guard_request(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host   = $_SERVER['HTTP_HOST'] ?? '';
    $allowed = cfg()['allowed_origins'] ?? [];

    if ($origin !== '') {
        $oHost = parse_url($origin, PHP_URL_HOST) . (parse_url($origin, PHP_URL_PORT) ? ':' . parse_url($origin, PHP_URL_PORT) : '');
        $same  = strcasecmp($oHost, $host) === 0;
        $ok    = $same || in_array($origin, $allowed, true);
        if ($ok) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
            header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
            header('Access-Control-Allow-Methods: POST, OPTIONS');
        } elseif (($_SERVER['REQUEST_METHOD'] ?? '') !== 'OPTIONS') {
            fail(403, 'This request is not allowed.');
        }
    }

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST, OPTIONS');
        fail(405, 'Method not allowed.');
    }
    // Custom header = browsers must run a CORS preflight, so other sites cannot post blindly.
    if (strcasecmp($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '', 'fetch') !== 0) {
        fail(400, 'Bad request.');
    }
}

function read_input(): array
{
    $raw = file_get_contents('php://input', false, null, 0, 40001);
    if ($raw !== false && strlen($raw) > 40000) {
        fail(413, 'That message is too large.');
    }
    $ct = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($ct, 'application/json') !== false) {
        $d = json_decode((string) $raw, true);
        return is_array($d) ? $d : [];
    }
    return $_POST;
}

/* ---------- sanitising ---------- */
function clean_line(mixed $v, int $max): string
{
    $v = is_string($v) ? $v : '';
    $v = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $v) ?? '';   // no newlines => no header injection
    return mb_substr(trim($v), 0, $max);
}

function clean_text(mixed $v, int $max): string
{
    $v = is_string($v) ? $v : '';
    $v = str_replace("\r\n", "\n", $v);
    $v = preg_replace('/[^\P{C}\n\t]+/u', '', $v) ?? '';
    return mb_substr(trim($v), 0, $max);
}

function valid_email(string $e): bool
{
    return strlen($e) <= 190 && filter_var($e, FILTER_VALIDATE_EMAIL) !== false;
}

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/* ---------- abuse protection ---------- */
function client_ip(): string
{
    if (!empty(cfg()['trust_proxy']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function rate_limit(string $bucket): void
{
    $rl     = cfg()['rate_limit'] ?? ['max' => 5, 'window' => 600];
    $file   = sys_get_temp_dir() . '/adventa_rl_' . md5($bucket . '|' . client_ip()) . '.json';
    $now    = time();
    $fh     = @fopen($file, 'c+');
    if (!$fh) return;
    flock($fh, LOCK_EX);
    $hits = json_decode((string) stream_get_contents($fh), true);
    $hits = is_array($hits) ? array_values(array_filter($hits, fn($t) => $t > $now - (int) $rl['window'])) : [];
    if (count($hits) >= (int) $rl['max']) {
        flock($fh, LOCK_UN);
        fclose($fh);
        fail(429, 'Too many attempts. Please wait a few minutes and try again.');
    }
    $hits[] = $now;
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    flock($fh, LOCK_UN);
    fclose($fh);
}

/* ---------- storage (backup copy of every submission, kept outside the email path) ---------- */
function store_append(string $file, string $line): void
{
    $dir = __DIR__ . '/storage';
    if (!is_dir($dir)) @mkdir($dir, 0750, true);
    @file_put_contents($dir . '/' . $file, $line . "\n", FILE_APPEND | LOCK_EX);
}

function log_error(string $msg): void
{
    store_append('errors.log', '[' . date('c') . '] ' . $msg);
}

/* ---------- mail ---------- */
function mail_configured(): bool
{
    $s = cfg()['smtp'] ?? [];
    return !empty($s['host']) && (($s['auth'] ?? true) === false || (!empty($s['password']) && $s['password'] !== 'CHANGE_ME'));
}

function make_mailer(): PHPMailer
{
    $c = cfg();
    $s = $c['smtp'];
    $m = new PHPMailer(true);
    $m->isSMTP();
    $m->Host       = $s['host'];
    $m->Port       = (int) ($s['port'] ?? 465);
    $m->SMTPAuth   = (bool) ($s['auth'] ?? true);
    $m->Username   = $s['username'] ?? '';
    $m->Password   = $s['password'] ?? '';
    $m->Timeout    = (int) ($s['timeout'] ?? 15);
    $secure        = strtolower((string) ($s['secure'] ?? 'ssl'));
    if ($secure === 'ssl')      { $m->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; }
    elseif ($secure === 'tls')  { $m->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; }
    else                        { $m->SMTPSecure = ''; $m->SMTPAutoTLS = false; }
    $m->CharSet    = 'UTF-8';
    $m->isHTML(true);
    $m->setFrom($c['from']['email'], $c['from']['name']);
    return $m;
}

/** @return array{0:bool,1:string} */
function send_mail(string $toEmail, string $toName, string $subject, string $html, string $text, ?array $replyTo = null): array
{
    try {
        $m = make_mailer();
        $m->addAddress($toEmail, $toName);
        if ($replyTo) $m->addReplyTo($replyTo['email'], $replyTo['name'] ?? '');
        $m->Subject = $subject;
        $m->Body    = $html;
        $m->AltBody = $text;
        $m->send();
        return [true, ''];
    } catch (MailException $e) {
        return [false, $e->getMessage()];
    } catch (Throwable $e) {
        return [false, $e->getMessage()];
    }
}

function email_layout(string $heading, string $bodyHtml): string
{
    $site = h(cfg()['site_name'] ?? 'Adventa Tek');
    return '<!doctype html><html><body style="margin:0;background:#f3f3ee;font-family:Arial,Helvetica,sans-serif;color:#050505">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 12px">'
        . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:14px;overflow:hidden">'
        . '<tr><td style="background:#050505;padding:22px 28px;font-size:22px;font-weight:800;color:#fff">' . $site . ' <span style="color:#cedc27">&bull;</span></td></tr>'
        . '<tr><td style="padding:30px 28px 8px;font-size:22px;font-weight:700">' . h($heading) . '</td></tr>'
        . '<tr><td style="padding:8px 28px 30px;font-size:15px;line-height:1.65">' . $bodyHtml . '</td></tr>'
        . '<tr><td style="background:#cedc27;padding:14px 28px;font-size:12px;font-weight:700">' . $site . ' &middot; Karachi, Pakistan</td></tr>'
        . '</table></td></tr></table></body></html>';
}

function notify_failed(string $err): never
{
    log_error('SMTP: ' . $err);
    $msg = 'We could not send your message right now. Please email us at ' . (cfg()['to']['email'] ?? 'hello@adventatek.com') . '.';
    json_out(500, ['ok' => false, 'message' => $msg] + (!empty(cfg()['debug']) ? ['debug' => $err] : []));
}
