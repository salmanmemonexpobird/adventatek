# Adventa Tek website (React + PHP)

React 18 + Vite + React Router frontend, PHP 8 backend (PHPMailer over SMTP) for the contact form and newsletter.

## Pages
`/` Home · `/about` · `/services` · `/projects` (Showcase with filter) · `/team` · `/contact`

## Run locally
```bash
npm install
npm run dev            # http://localhost:5173  (forms need the PHP server below)
php -S 127.0.0.1:8000 -t public   # in a second terminal, serves /api for the dev proxy
```
To test the production build with the PHP API together:
```bash
npm run build
php -S 127.0.0.1:8000 -t dist dev-router.php
```

## Deploy to your hosting (cPanel / any Apache + PHP 8)
1. `npm run build` creates the `dist/` folder.
2. Upload **everything inside `dist/`** (including `.htaccess` and the `api/` folder) to `public_html/`.
3. Open `api/config.php` on the server and fill in the mail settings:
   - create the mailbox first (cPanel > Email Accounts), e.g. `hello@adventatek.com`
   - `host` is usually `mail.yourdomain.com`, port `465` with `'secure' => 'ssl'` (or `587` with `'tls'`)
   - put the mailbox password in `password`
4. Done. Submit the contact form once to confirm the email arrives.

Enquiries and subscribers are also saved in `api/storage/` (`contacts.jsonl`, `subscribers.csv`) as a backup, and mail errors go to `api/storage/errors.log`. That folder, `config.php` and `vendor/` are blocked from the browser by `.htaccess`.

## What the backend does
- `api/contact.php`: validates name, email, message, sends the enquiry to you (Reply-To is the visitor) and a confirmation to the visitor.
- `api/newsletter.php`: validates, de-duplicates, saves the address, notifies you and sends a welcome email.
- Protection: honeypot field, rate limit (5 per 10 min per IP and form), same-origin check, header-injection safe, 40 KB body limit.

## Edit the content
- Text, projects, services, team: `src/data/content.jsx` and the page files in `src/pages/`.
- Look and hover animations: `src/styles/site.css`.
- Replace the placeholder project names ("Project One"...) and team members with real ones.

## Preview build (no server needed)
`npm run build:preview` builds `dist-preview/` with hash routing so it can be opened from any folder or URL. Forms need the PHP backend, so they do not send from the preview.
