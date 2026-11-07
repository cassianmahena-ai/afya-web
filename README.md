# Afya-Web: Lupyana Polyclinic website

Static, bilingual (English / Swahili), mobile-first clinic website. No build step, no server. All content lives in `config.js`.

## Run

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8080
```

Pages: `index`, `about`, `services`, `doctors`, `appointments`, `health-tips`, `contact`.

## Editing content

Everything is in `config.js`. Every item has a `status`:

| status | meaning |
| --- | --- |
| `"pending"` | placeholder. Shown only in preview mode, with a "To be confirmed" badge |
| `"confirmed"` | approved by the clinic. Shown on the live site |

To publish an item: replace its text, set `status: "confirmed"`.

- Add or remove services, doctors and tips by adding or removing entries in their lists.
- Swap photos: put files in `assets/img/`, set `src`, mark `confirmed`. Without a photo, a brand illustration is shown.
- Doctors need `consent: true` before they appear on the live site.
- Swahili is optional per field. A missing `sw` falls back to English. Swahili interface text was written without a native review; have the clinic check it.

## Preview and live

- `mode: "preview"` (default): a bar at the bottom shows how many items still need confirming, lists them under **Checklist**, and switches between **Preview** (placeholders visible) and **Live view** (unconfirmed content hidden). Add `?live=1` to a URL for live view.
- `mode: "live"`: the bar and all pending content disappear. Do this before launch.

## Appointment form

Sends the request to the clinic's WhatsApp (or email, set `enquiry.channel` to `"email"`). It stays switched off until that contact is `confirmed`. The form warns patients not to send medical details. No data is stored.

## Deploy

Any static host: Netlify, Cloudflare Pages, GitHub Pages, or a plain web server. Upload the whole folder except `_reference/`.

## Files

- `config.js`: all content and settings
- `assets/js/app.js`: rendering, language, form
- `assets/css/style.css`: design
- `8B-PROMPT.md`: prompt for the 8B AI website builder
- `_reference/`: proposal and homepage mockup
