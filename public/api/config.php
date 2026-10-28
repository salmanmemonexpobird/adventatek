<?php
/**
 * Adventa Tek mail settings.  EDIT THIS FILE on your hosting after uploading.
 * (Create the mailbox first, e.g. hello@adventatek.com, in cPanel > Email Accounts.)
 * This file and the whole /api folder internals are blocked from the browser by .htaccess.
 */
return [
    'smtp' => [
        'host'     => 'mail.adventatek.com',   // cPanel: usually mail.yourdomain.com (see Email Accounts > Connect Devices)
        'port'     => 465,                     // 465 with 'ssl'  |  587 with 'tls'
        'secure'   => 'ssl',                   // 'ssl', 'tls' or 'none'
        'auth'     => true,
        'username' => 'hello@adventatek.com',  // the full mailbox address
        'password' => 'CHANGE_ME',             // <-- put the mailbox password here
        'timeout'  => 15,
    ],
    'from' => ['email' => 'hello@adventatek.com', 'name' => 'Adventa Tek'],   // must be the mailbox above (or an alias of it)
    'to'   => ['email' => 'hello@adventatek.com', 'name' => 'Adventa Tek'],   // where enquiries and new subscribers are sent

    'site_name'   => 'Adventa Tek',
    'site_url'    => 'https://adventatek.com',

    'auto_reply'  => true,                     // send a "we got your message" email to the visitor
    'rate_limit'  => ['max' => 5, 'window' => 600],   // per visitor IP: 5 submissions / 10 minutes per form
    'allowed_origins' => [],                   // extra sites allowed to call this API (empty = this site only)
    'trust_proxy' => false,                    // set true only if behind Cloudflare/another proxy (uses X-Forwarded-For)
    'debug'       => false,                    // true returns the real mail error in the JSON (never leave on in production)
];
