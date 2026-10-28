<?php
declare(strict_types=1);
require __DIR__ . '/lib.php';

guard_request();
$in = read_input();

// Honeypot: bots fill the hidden "website" field. Pretend success and drop it.
if (clean_line($in['website'] ?? '', 200) !== '') {
    json_out(200, ['ok' => true, 'message' => 'Thank you! Your message has been sent.']);
}

$name    = clean_line($in['name'] ?? '', 100);
$email   = clean_line($in['email'] ?? '', 190);
$phone   = clean_line($in['phone'] ?? '', 40);
$service = clean_line($in['service'] ?? '', 40);
$message = clean_text($in['message'] ?? '', 5000);

$allowedServices = ['Branding', 'Digital', 'Development', 'Not sure yet'];
if (!in_array($service, $allowedServices, true)) $service = 'Not sure yet';

if (mb_strlen($name) < 2)           fail(422, 'Please enter your name.');
if (!valid_email($email))           fail(422, 'Please enter a valid email address.');
if (mb_strlen($message) < 10)       fail(422, 'Please tell us a little more about your project.');
if ($phone !== '' && !preg_match('/^[0-9+()\-\s.]{5,40}$/', $phone)) fail(422, 'Please enter a valid phone number or leave it empty.');

rate_limit('contact');

$c   = cfg();
$ip  = client_ip();
$ua  = clean_line($_SERVER['HTTP_USER_AGENT'] ?? '', 200);
$now = date('Y-m-d H:i:s');

// Backup copy first, so an enquiry is never lost even if SMTP is down.
store_append('contacts.jsonl', json_encode(compact('now', 'name', 'email', 'phone', 'service', 'message', 'ip'), JSON_UNESCAPED_UNICODE));

if (!mail_configured()) {
    log_error('SMTP not configured (edit api/config.php). Enquiry from ' . $email . ' saved to storage/contacts.jsonl');
    json_out(503, ['ok' => false, 'message' => 'Our contact form is being set up. Please email us at ' . ($c['to']['email'] ?? 'hello@adventatek.com') . '.']);
}

$rows = [
    'Name' => $name, 'Email' => $email, 'Phone / WhatsApp' => $phone !== '' ? $phone : '-', 'Needs' => $service,
];
$table = '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">';
foreach ($rows as $k => $v) {
    $table .= '<tr><td style="padding:8px 0;width:150px;color:#6b6b66;font-weight:700;border-bottom:1px solid #eee">' . h($k) . '</td><td style="padding:8px 0;border-bottom:1px solid #eee">' . h($v) . '</td></tr>';
}
$table .= '</table><p style="margin:20px 0 6px;color:#6b6b66;font-weight:700">Project details</p>'
        . '<div style="background:#f3f3ee;border-radius:10px;padding:14px 16px;white-space:pre-wrap">' . h($message) . '</div>'
        . '<p style="margin:18px 0 0;font-size:12px;color:#8a8a84">Received ' . h($now) . ' from ' . h($ip) . '. Reply to this email to answer ' . h($name) . ' directly.</p>';

$text = "New enquiry\n\nName: $name\nEmail: $email\nPhone: " . ($phone ?: '-') . "\nNeeds: $service\n\n$message\n\nReceived $now from $ip";

[$ok, $err] = send_mail(
    $c['to']['email'], $c['to']['name'] ?? '',
    "New enquiry from $name ($service)",
    email_layout('New website enquiry', $table), $text,
    ['email' => $email, 'name' => $name]
);
if (!$ok) notify_failed($err);

// Friendly confirmation to the visitor (a failure here must not fail the request)
if (!empty($c['auto_reply'])) {
    $first = explode(' ', $name)[0];
    $body  = '<p>Hi ' . h($first) . ',</p><p>Thanks for getting in touch. We have your message about <b>' . h($service) . '</b> and will reply within 24 hours, usually sooner.</p>'
           . '<p>If you need to add anything, just reply to this email.</p><p>The ' . h($c['site_name'] ?? 'Adventa Tek') . ' team</p>';
    [$ok2, $err2] = send_mail($email, $name, 'We received your message', email_layout('Thanks, ' . $first . '!', $body),
        "Hi $first,\n\nThanks for getting in touch. We will reply within 24 hours.\n\nThe " . ($c['site_name'] ?? 'Adventa Tek') . " team");
    if (!$ok2) log_error('Auto-reply failed: ' . $err2);
}

json_out(200, ['ok' => true, 'message' => 'Thank you, ' . explode(' ', $name)[0] . '! Your message has been sent. We will reply within 24 hours.']);
