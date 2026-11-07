# Lupyana Polyclinic — website

A complete, static, multi-page website for **Lupyana Polyclinic** in Tanzania. It uses semantic HTML, one CSS design-system file and a small amount of vanilla JavaScript. There is no build step and no framework to maintain.

The site is deliberately placeholder-first: every unconfirmed clinic detail is visibly marked (for example `[CLINIC_PHONE]` or `[SW: Home]`) and every editable string lives in **`content.json`**.

---

## 1. Refined brief

I kept the clinic name, the no-invented-content rule, and the primary actions (call, WhatsApp, directions, appointment enquiry). I assumed a static multi-page build instead of Next.js so the clinic can deploy anywhere, edit one JSON file and load quickly on weak mobile connections; the components map 1:1 to a Next.js or Figma structure. English is the source language; Swahili strings are marked `[SW: …]` until approved. Staff and gallery sections hide automatically until items are marked `approved: true`. The enquiry form is honest by default: it validates, but shows a success state only when a real endpoint is configured; otherwise it tells patients to call or WhatsApp. A phone/WhatsApp-only mode can replace the form entirely.

---

## 2. Sitemap

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, quick info, services, about, team, gallery, contact, emergency, CTA |
| About Lupyana | `about.html` | History, mission, values, key facts, facilities/gallery |
| Medical Services | `services.html` | Services grid, departments, laboratory/diagnostics, facilities, hours |
| Doctors & Team | `team.html` | Consent-gated profiles with accessible detail dialog |
| Contact & Location | `contact.html` | Phone, WhatsApp, email, address, hours, preferred contact, map |
| Appointment Enquiry | `appointment.html` | Validated form, consent, honeypot, rate limit, phone-only mode |
| Privacy & Terms | `privacy.html` | Plain-language draft for legal review |
| 404 | `404.html` | Not-found page with recovery links |

---

## 3. Pages and components

**Pages:** Home, About, Services, Team, Contact, Appointment, Privacy, 404.

**Reusable components (rendered by `assets/js/main.js`):**

- `Header` — top bar, supplied logo mark + Bricolage wordmark, primary nav, language switcher, Call, WhatsApp, menu button
- `MobileNav` — full-screen menu, large tap targets, contact actions, language switcher
- `MobileActionBar` — sticky Call / WhatsApp / Directions bar
- `FloatingWhatsApp` — always-available WhatsApp button
- `Footer` — clinic summary, quick links, contact details, hours, language switcher, legal links
- `Hero` — clinic name, tagline, intro, primary/secondary CTAs, 16:9 placeholder
- `QuickInfoStrip` — hours, phone, location cards
- `SectionHeader` — eyebrow, heading, lead, optional action
- `ServiceCard` — icon, name, description, department, enquire link
- `StaffCard` + `StaffDialog` — portrait, name, title, field, qualifications, consent-gated profile
- `GalleryCard` — 3:2 approved photo, caption
- `MiniCard` — department or facility
- `ContactBlock` — labelled phone, WhatsApp, email, address, hours, preferred contact
- `MapBlock` — Google Maps embed when a real embed URL exists, otherwise a labelled placeholder
- `EmergencyBox` — warm, high-visibility instructions panel
- `CTABand` — final call / WhatsApp / appointment band
- `EnquiryForm` — fields, notice, consent, honeypot, validation, status states
- `PlaceholderBlock` — labelled 16:9, 4:3, 3:2 and 1:1 image slots
- `Token` — the dashed, monospace marker around every unconfirmed value
- `Toast` — explains that a contact detail is awaiting approval
- `Breadcrumbs` — page context and keyboard-friendly navigation

---

## 4. Design tokens

Tokens live in one place: `assets/css/styles.css`, in `:root`.

### Colour

| Token | Value | Use |
|---|---|---|
| `--c-primary` | `#0B5D5A` | Buttons, links, icons, focus rings |
| `--c-primary-700` | `#074643` | Button hover, strong text |
| `--c-primary-800` | `#063634` | Top bar, footer |
| `--c-primary-200` | `#B9DCD7` | Soft borders |
| `--c-primary-100` | `#DCEFEC` | Tints |
| `--c-primary-50` | `#F0F8F6` | Section and card tints |
| `--c-secondary` | `#123B5D` | Reserved secondary blue |
| `--c-accent` | `#E9A23B` | Warm CTA and emergency accent |
| `--c-accent-soft` | `#FDF2DF` | Emergency/notice backgrounds |
| `--c-text` | `#0F2A2A` | Body and headings |
| `--c-muted` | `#4B6363` | Secondary text (AA on white and surface) |
| `--c-border` | `#D6E4E1` | Hairlines |
| `--c-border-strong` | `#B9D0CC` | Input borders |
| `--c-surface` | `#F5F9F8` | Alternating bands |
| `--c-surface-2` | `#EAF3F1` | Chips, soft fills |
| `--c-success` | `#1F7A4D` | Success status |
| `--c-danger` | `#B3261E` | Errors |

To apply the clinic's brand colours, change these variables only. Keep body text at 4.5:1 contrast or better.

### Type

Two families, both from Google Fonts with system fallbacks:

- **Bricolage Grotesque** — SemiBold 600 / Bold 700. Used for H1–H3, service titles, section headings and the Lupyana wordmark. Set in `--font-display`.
- **Onest** — Regular 400 / Medium 500 / SemiBold 600. Used for body copy, navigation, labels, buttons, forms and captions. Set in `--font-sans`.

| Token | Size | Use |
|---|---|---|
| `--fs-display` | `clamp(2.35rem, 1.45rem + 4vw, 4.15rem)` | H1 |
| `--fs-h2` | `clamp(1.8rem, 1.25rem + 2.2vw, 2.7rem)` | Section headings |
| `--fs-h3` | `clamp(1.12rem, 1rem + 0.45vw, 1.35rem)` | Card headings |
| `--fs-lead` | `clamp(1.05rem, 0.98rem + 0.4vw, 1.22rem)` | Lead paragraphs |
| `--fs-body` | `1.0625rem` | Body |
| `--fs-sm` | `0.9375rem` | Supporting text |
| `--fs-xs` | `0.8125rem` | Captions, labels |

H1/H2 use Bricolage Grotesque 700 with `-0.025em` tracking; H3 and card titles use 600. Body line-height is 1.65.

### Spacing, radius, shadow

- Spacing: `0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6rem` (`--space-1` … `--space-24`)
- Radius: `12px` small, `18px` medium, `26px` large, `34px` extra large, `999px` pill
- Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg` (all soft teal-tinted)
- Container: `1180px`; gutters `clamp(1rem, 3vw, 2rem)`; header `74px` desktop / `66px` mobile; bottom bar `66px`

---

## 5. Setup and run

No installation is required.

```bash
cd lupyana-polyclinic
npm run serve
# open http://localhost:4173
```

Equivalent options:

```bash
npx serve .
# or
python -m http.server 4173
```

> Opening `index.html` directly from disk also works because `assets/js/content-data.js` is a generated fallback copy of `content.json`. For the live site, always serve over HTTP so `content.json` is fetched as the single source of truth.

### Editing content

1. Edit **`content.json`** (clinic details, services, staff, photos, EN/SW strings).
2. Run **`npm run sync`** to regenerate `assets/js/content-data.js` and fill any missing `[SW: …]` placeholders.
3. Refresh the browser.

### Deploying

Upload the whole folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel, S3). Then:

- Replace `[SITE_URL]` in every HTML file and `sitemap.xml`. In `robots.txt`, replace `[SITE_URL]` and uncomment the `Sitemap:` line (a sitemap URL must be absolute).
- Configure the host to serve `404.html` for unknown paths.
- Set `site.baseUrl` in `content.json` to the live URL (canonical and `og:url` update automatically).
- Replace `site.ogImage` and the `og:image` / `twitter:image` tags with an **absolute** URL to an approved 1200×630 image.
- Connect the form endpoint (below) or set `site.enquiryMode` to `"phone"`.

---

## 6. How to replace placeholders

All editable content is in `content.json`.

### Clinic details (`clinic`)

| Key | Replace with |
|---|---|
| `name` | Approved clinic name (already set to Lupyana Polyclinic) |
| `tagline` | `[TAGLINE]` → approved one-line welcome |
| `intro` | `[CLINIC_INTRO]` → approved short introduction |
| `history` | `[HISTORY]` → approved background |
| `mission`, `values` | `[MISSION]`, `[VALUES]` |
| `keyFacts` | `[KEY_FACTS]` → confirmed facts only |
| `address`, `ward`, `district`, `region` | `[ADDRESS]`, `[WARD]`, `[DISTRICT]`, `[REGION]` |
| `locationLine` | Short location line for the hero eyebrow |
| `phone`, `phoneAlt` | `[CLINIC_PHONE]`, `[CLINIC_PHONE_2]` |
| `whatsapp` | `[WHATSAPP_NUMBER]` (international format, digits only is fine) |
| `email`, `enquiryEmail` | `[CLINIC_EMAIL]`, `[ENQUIRY_EMAIL]` |
| `preferredContact` | `[PREFERRED_CONTACT]` |
| `hours` | `[HOURS]` |
| `emergency` | `[EMERGENCY_INSTRUCTIONS]` |
| `mapLink` | `[MAP_LINK]` — use a Google Maps **embed** URL to show the map |
| `logo` | Supplied logo mark, already set to `assets/img/logo-mark.png` (header). The full lockup is `assets/img/logo.png` (footer). |
| `brandColours` | `[BRAND_COLOURS]` — documentation value; actual colours are CSS tokens |
| `serviceList`, `departments`, `facilities`, `labServices`, `staffList`, `photos` | Section-level placeholder labels |

### Services (`services`)

Each item has `id`, `icon`, and `{ en, sw }` values for `name`, `desc` and `department`. Replace the `[SERVICE_NAME_n]`, `[SERVICE_DESC_n]` and `[DEPARTMENT_n]` placeholders. Add or remove items freely; the home page shows the first four, the services page shows all six.

### Staff (`staff`)

Profiles are **hidden unless `approved` is `true`**. Only set this after written consent. Fill `name`, `title`, `field`, `bio`, `qualifications` and `photo` (a 1:1 image path under `assets/img/`). The home teaser and team page update automatically.

### Photos (`photos`)

Set `approved: true` only for photos the clinic has approved. Add `src` (3:2 image path), `alt` and `caption`. The gallery sections hide automatically when no photo is approved.

### Contact and map

- Phone and WhatsApp links are generated only when the value is real. Until then they show a toast instead of dialling a placeholder.
- A Google Maps iframe is injected only when `mapLink` starts with a Google Maps **embed** URL. Otherwise a labelled placeholder is shown.
- The WhatsApp links use the prefilled message `contact.whatsapp.message`.

### Enquiry form endpoint

Set `site.enquiryEndpoint` to an HTTPS endpoint (Formspree, Netlify Function, Vercel Function, your own API). The form POSTs JSON:

```json
{
  "fullName": "…",
  "phone": "…",
  "preferredDate": "YYYY-MM-DD",
  "preferredTime": "HH:MM",
  "service": "service-1",
  "serviceLabel": "…",
  "message": "…",
  "consent": true,
  "language": "en",
  "page": "https://…/appointment.html"
}
```

The endpoint should return a 2xx status. The server must validate, rate-limit, send to `[ENQUIRY_EMAIL]` and avoid storing sensitive health data. The client includes a honeypot (`company`) and a 2-minute local rate limit; neither replaces server-side protection.

If the clinic prefers phone/WhatsApp only, set:

```json
"enquiryMode": "phone"
```

The form is hidden and a call/WhatsApp panel is shown instead.

### Swahili

Every UI string and every structured item has an `en` and `sw` value. Swahili values are `[SW: …]` placeholders until the clinic approves translations. Do not machine-translate medical or service content as final. `npm run sync` fills any missing Swahili key with a marked placeholder.

### Site URL and social image

- Replace `[SITE_URL]` in HTML meta tags, JSON-LD and `sitemap.xml`; then uncomment the `Sitemap:` line in `robots.txt`.
- `assets/img/og-image.png` is the supplied 1200×630 share card. Replace it only if the clinic supplies a new one, and update `site.ogImage` plus the meta tags.

---

## 7. Form, privacy and safety notes

- The form never asks for medical history, diagnosis, prescriptions or patient records.
- A notice above the form tells patients not to include sensitive health information.
- Consent is required before submission.
- The success message is exactly: **“Thank you. The clinic will contact you using the details provided.”**
- If no endpoint is configured, the form **does not pretend to send**. It says the form is not connected and asks the patient to call or WhatsApp.
- No analytics, cookies, tracking pixels or patient records are included.
- The privacy page is a draft for the clinic's legal adviser; it must be reviewed before launch.

---

## 8. SEO and accessibility

- Unique `<title>`, meta description, canonical and Open Graph/Twitter tags on every page.
- `MedicalClinic` JSON-LD on the home page, with `WebPage`/`AboutPage`/`ContactPage` schema on the other pages.
- `sitemap.xml` with EN/SW alternates, `robots.txt`, semantic landmarks, skip link, visible focus states, 44px+ tap targets, labelled form fields, `aria-live` status messages, keyboard-operable menu and dialog, and reduced-motion support.
- Staff and gallery sections are removed from the visual page until approved, so the site never shows unconsented people or photos.
- Placeholder values are styled with a dashed amber token so they cannot be mistaken for approved content.

---

## 9. Figma handoff

### Frames (per page)

Create three frames for each of the eight pages:

- **Desktop 1440** — 1180px container, 24px gutters, sticky 74px header
- **Tablet 768** — 2-column card grids, mobile action bar visible, 66px header
- **Mobile 390** — single column, stacked hero actions, 66px bottom bar + floating WhatsApp

Pages: Home, About, Services, Team, Contact, Appointment, Privacy, 404.

### Components to create

`Header/Default`, `Header/Scrolled`, `Nav/Link/Default`, `Nav/Link/Active`, `LanguageSwitcher`, `Button/Primary`, `Button/Ghost`, `Button/Accent`, `Button/White`, `Button/OutlineWhite`, `Button/Small`, `Hero`, `QuickInfoCard`, `SectionHeader`, `ServiceCard`, `StaffCard`, `StaffDialog`, `GalleryCard`, `MiniCard`, `ContactRow`, `MapBlock`, `EmergencyBox`, `CTABand`, `Form/Field`, `Form/Select`, `Form/Textarea`, `Form/Checkbox`, `Form/Status/Success`, `Form/Status/Error`, `Form/Status/Info`, `Footer`, `FloatingWhatsApp`, `MobileActionBar`, `Placeholder/16x9`, `Placeholder/4x3`, `Placeholder/3x2`, `Placeholder/1x1`, `Token`.

### Figma variables to recreate

- Colour: `primary`, `primary-700`, `primary-800`, `primary-200`, `primary-100`, `primary-50`, `secondary`, `accent`, `accent-soft`, `text`, `muted`, `border`, `border-strong`, `surface`, `surface-2`, `success`, `danger`
- Radius: `sm 12`, `md 18`, `lg 26`, `xl 34`, `pill 999`
- Spacing: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`
- Shadow: `sm`, `md`, `lg`
- Type: `display`, `h2`, `h3`, `lead`, `body`, `sm`, `xs`
- Font families: `Bricolage Grotesque` (600 SemiBold / 700 Bold — headings and wordmark), `Onest` (400 / 500 / 600 — body and UI)
- Layout: `container 1180`, `gutter 24`, `header 74`, `mobile-header 66`, `bottom-bar 66`

### Prototype notes

- Language switch updates all strings and the `<html lang>` attribute.
- Mobile menu opens as a full-screen overlay with focus trapping and Escape to close.
- Staff cards open an accessible `<dialog>`.
- Form states: default, field error, consent error, sending, success, error, not-configured, rate-limited.
- Placeholder blocks are labelled with their aspect ratio and token.

---

## 10. Content checklist — waiting on the clinic

### Clinic identity and contact
- [ ] `[TAGLINE]`
- [ ] `[CLINIC_INTRO]`
- [ ] `[HISTORY]`
- [ ] `[MISSION]`
- [ ] `[VALUES]`
- [ ] `[KEY_FACTS]`
- [ ] `[ADDRESS]`
- [ ] `[WARD]`
- [ ] `[DISTRICT]`
- [ ] `[REGION]`
- [ ] `[MAP_LINK]` (Google Maps embed URL)
- [ ] `[CLINIC_PHONE]`
- [ ] `[CLINIC_PHONE_2]`
- [ ] `[WHATSAPP_NUMBER]`
- [ ] `[CLINIC_EMAIL]`
- [ ] `[ENQUIRY_EMAIL]`
- [ ] `[PREFERRED_CONTACT]`
- [ ] `[HOURS]`
- [ ] `[EMERGENCY_INSTRUCTIONS]`
- [x] `[CLINIC_LOGO]` — supplied; integrated as `assets/img/logo.png`, `logo-mark.png`, favicons and `og-image.png`
- [ ] `[BRAND_COLOURS]`
- [ ] `[SITE_URL]`
- [x] `[OG_IMAGE]` — supplied as `assets/img/og-image.png` (1200×630)

### Services and facilities
- [ ] `[SERVICE_LIST]`
- [ ] `[SERVICE_NAME_1]` … `[SERVICE_NAME_6]`
- [ ] `[SERVICE_DESC_1]` … `[SERVICE_DESC_6]`
- [ ] `[DEPARTMENT_1]` … `[DEPARTMENT_6]`
- [ ] `[DEPARTMENTS]`
- [ ] `[DEPARTMENT_NAME_1]` … `[DEPARTMENT_NAME_4]`
- [ ] `[DEPARTMENT_DESC_1]` … `[DEPARTMENT_DESC_4]`
- [ ] `[LAB_SERVICES]`
- [ ] `[FACILITIES]`
- [ ] `[FACILITY_NAME_1]` … `[FACILITY_NAME_4]`
- [ ] `[FACILITY_DESC_1]` … `[FACILITY_DESC_4]`

### Staff (written consent required)
- [ ] `[STAFF_LIST]`
- [ ] `[DOCTOR_NAME_1]` … `[DOCTOR_NAME_4]`
- [ ] `[DOCTOR_TITLE_1]` … `[DOCTOR_TITLE_4]`
- [ ] `[DOCTOR_FIELD_1]` … `[DOCTOR_FIELD_4]`
- [ ] `[DOCTOR_BIO_1]` … `[DOCTOR_BIO_4]`
- [ ] `[QUALIFICATIONS_1]` … `[QUALIFICATIONS_4]`
- [ ] `[DOCTOR_PHOTO_1]` … `[DOCTOR_PHOTO_4]`
- [ ] `approved: true` for each consented profile

### Photos
- [ ] `[PHOTOS]`
- [ ] `[PHOTO_HERO]` (16:9)
- [ ] `[PHOTO_ABOUT]` (4:3)
- [ ] `[PHOTO_1]` … `[PHOTO_4]` (3:2)
- [ ] `[PHOTO_CAPTION_1]` … `[PHOTO_CAPTION_4]`
- [ ] `[PHOTO_ALT_1]` … `[PHOTO_ALT_4]`
- [ ] `approved: true` for each approved photo

### Legal and form
- [ ] `[PRIVACY_WHAT_WE_COLLECT]`
- [ ] `[PRIVACY_WHO_RECEIVES]`
- [ ] `[PRIVACY_RETENTION]`
- [ ] `[PRIVACY_RIGHTS]`
- [ ] `[PRIVACY_CONTACT]`
- [ ] `[TERMS_PLACEHOLDER]`
- [ ] Legal review of the privacy and terms page
- [ ] `[ENQUIRY_ENDPOINT]` or a decision to use phone/WhatsApp-only mode

### Language
- [ ] All `[SW: …]` strings reviewed and approved by a fluent speaker

---

## 11. Known limits

- This is a static site, not a CMS. A non-technical editor changes `content.json`; `npm run sync` keeps the offline fallback current.
- The enquiry form does not send until `enquiryEndpoint` is configured. This is intentional so the site never implies a request was received when it was not.
- The map only appears when a Google Maps embed URL is supplied.
- Swahili uses one dictionary and a `?lang=sw` query parameter (persisted in `localStorage`) rather than separate `/sw/` routes. `sitemap.xml` declares the alternates.
- No stock photos of people are used. Every image is a labelled placeholder until approved.
- Google Fonts is the only third-party request. Self-host **Bricolage Grotesque** and **Onest** if the clinic needs a fully offline build.
- The footer keeps a small “Design base: 8B (MIT)” credit because this site reuses the visual language of the 8B Pipit template. See `CREDITS.md`.

---

## 12. Credits

Full licence texts and reuse notes are in **`CREDITS.md`**.

- Design base: **Pipit** speech-therapist template by **8B** — MIT licence. No photographs from the template are used.
- Icons: Lucide-style line icons, recreated inline (ISC licence).
- Typefaces: **Bricolage Grotesque** and **Onest** — SIL Open Font License.
- Logo: supplied by Lupyana Polyclinic; not part of the template licence.
