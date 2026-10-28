<?php
// Local testing helper:  php -S 127.0.0.1:8000 -t dist dev-router.php
// Serves files and the /api scripts normally, and falls back to index.html for React routes.
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . '/dist' . $path;
if ($path !== '/' && is_file($file)) return false;
if (str_starts_with($path, '/api/')) { http_response_code(404); echo 'Not found'; return true; }
readfile(__DIR__ . '/dist/index.html');
