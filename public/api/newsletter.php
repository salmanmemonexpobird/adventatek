<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

guard_request();
$in = read_input();

if (clean_line($in['website'] ?? '', 200) !== '') {
    json_out(200, ['ok' => true, 'message' => 'You are subscribed. Thank you!']);
}

$email = strtolower(clean_line($in['email'] ?? '', 190));
if (!valid_email($email)) fail(422, 'Please enter a valid email address.');

rate_limit('newsletter');

$c    = cfg();
$file = __DIR__ . '/storage/subscribers.csv';
$dir  = dirname($file);
if (!is_dir($dir)) @mkdir($dir, 0750, true);

// Already subscribed? Say so politely, send nothing.
$fh = @fopen($file, 'c+');
if ($fh) {
    flock($fh, LOCK_EX);
    $existing = array_map(fn($l) => strtolower(trim(explode(',', $l)[0])), file($file, FILE_IGNORE_NEW_LINES) ?: []);
    if (in_array($email, $existing, true)) {
        flock($fh, LOCK_UN); fclose($fh);
        json_out(200, ['ok' => true, 'message' => 'You are already on the list. Thank you!']);
    }
    fseek($fh, 0, SEEK_END);
    fwrite($fh, $email . ',' . date('c') . ',' . client_ip() . "\n");
    flock($fh, LOCK_UN);
    fclose($fh);
}

if (!mail_configured()) {
    log_error('SMTP not configured (edit api/config.php). Subscriber ' . $email . ' saved to storage/subscribers.csv');
    json_out(200, ['ok' => true, 'message' => 'You are subscribed. Thank you!']);   // saved safely; the owner can still export the CSV
}

[$ok, $err] = send_mail(
    $c['to']['email'], $c['to']['name'] ?? '',
    'New newsletter subscriber',
    email_layout('New subscriber', '<p><b>' . h($email) . '</b> just subscribed from the website footer.</p><p style="font-size:12px;color:#8a8a84">' . h(date('Y-m-d H:i:s')) . '</p>'),
    "New newsletter subscriber: $email",
    ['email' => $email]
);
if (!$ok) log_error('Subscriber notification failed: ' . $err);   // subscriber is already saved, so still a success for them

if (!empty($c['auto_reply'])) {
    $body = '<p>Thanks for subscribing to ' . h($c['site_name'] ?? 'Adventa Tek') . '. We will send you useful notes on branding, marketing and web, and never spam.</p>';
    [$ok2, $err2] = send_mail($email, '', 'You are subscribed', email_layout('Welcome aboard', $body), 'Thanks for subscribing to ' . ($c['site_name'] ?? 'Adventa Tek') . '.');
    if (!$ok2) log_error('Welcome email failed: ' . $err2);
}

json_out(200, ['ok' => true, 'message' => 'You are subscribed. Thank you!']);
