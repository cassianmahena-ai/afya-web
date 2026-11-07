# 8B prompt for Lupyana Polyclinic

Go to https://ai.8b.com/ (free, no sign-up). Paste the main prompt, then send the follow-ups one at a time. Download the HTML when done.

## Main prompt

```
Design a website for Lupyana Polyclinic, a private polyclinic in Tanzania. Audience: families and adults in the local community, many on mobile phones with slow data. The site must feel warm, trustworthy and modern, like a clinic people are glad to walk into, not a hospital brochure and not a tech startup.

Brand: the logo is a heart-shaped stethoscope holding a green child and a blue adult above an orange cupped hand. Use its three colours: leaf green #62A83C (dark green #2F6B1C for buttons and text), sky blue #1884CC, sun orange #F09C18 as small accents only. White and very pale green backgrounds. Friendly rounded sans-serif typography, large readable text, high contrast. No purple gradients, no stock hospital clichés.

Page structure, top to bottom:
1. Slim top bar with address, phone, email and an EN / SW language switch.
2. Sticky header with the logo, links (Home, About, Services, Our doctors, Appointments, Health tips, Contact) and a green "Book an appointment" button.
3. Hero: headline "Your health, our priority", one supporting sentence, two buttons ("Book an appointment", "Explore our services"), and three short trust points with icons. On the right, an arch-shaped photo frame with an orange outline.
4. "Comprehensive care under one roof": a row of six service tiles with line icons: General medicine, Pediatrics, Gynecology and obstetrics, Internal medicine, Laboratory, Pharmacy.
5. "Care you can rely on": split panel with four checkmarks on the left and a photo on the right.
6. Green appointment band: "Get the care you need, when you need it" with a booking button.
7. Footer with logo, quick links, contact details and opening hours.

Rules:
- Do not invent facts. No awards, no years of experience, no patient numbers, no testimonials, no prices, no doctor names. Use clearly marked placeholders such as "[Phone number]" and "[Address]" wherever real details are needed.
- Every button that books an appointment opens a WhatsApp chat link; add a floating WhatsApp button on mobile.
- Mobile first, fast, accessible: visible focus states, good contrast, tap targets of 48px or more.
- Keep motion minimal: one gentle entrance animation on the hero, nothing else moving on its own.
- Write all text in English and include a working EN / SW switch with Swahili text (Swahili to be reviewed by the clinic).
```

## Follow-ups

1. `Replace every placeholder in square brackets with a visible yellow highlight so the clinic can spot what still needs filling.`
2. `Add an appointment request form with name, phone, preferred date, service and a short message, and a note: "Please do not include medical history or prescriptions." The form opens WhatsApp with the details filled in.`
3. `Add a Contact section with address, phone, WhatsApp, email, opening hours and a "Get directions" button.`
4. `Make the hero image area a clear empty photo slot with the arch shape, ready for a real clinic photo.`
5. `Add LocalBusiness / MedicalClinic structured data using only the placeholders, and a short meta description.`

## After generating

8B returns one HTML file with the design only. Language switch, form logic and the confirmed/pending system are not part of it. For those, use this repo (`config.js` drives everything), or copy 8B's visual style into it.
