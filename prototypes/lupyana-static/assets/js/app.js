(() => {
  const C = window.SITE_CONFIG;
  const PAGE = document.body.dataset.page || "home";
  const root = document.getElementById("root");
  const pvRoot = document.getElementById("pv");
  const toastEl = document.getElementById("toast");
  const params = new URLSearchParams(location.search);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  const state = {
    lang: ["en", "sw"].includes(params.get("lang")) ? params.get("lang")
        : (["en", "sw"].includes(store.get("lupyana.lang")) ? store.get("lupyana.lang") : C.defaultLang || "en"),
    view: C.mode === "live" ? "live"
        : (params.get("live") === "1" ? "live" : (store.get("lupyana.view") === "live" ? "live" : "preview")),
    panel: false
  };

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tr = (o) => (o ? (o[state.lang] || o.en || "") : "");
  const ui = (k) => tr(C.ui[k]);
  const preview = () => C.mode !== "live" && state.view === "preview";
  const confirmed = (o) => !!o && o.status === "confirmed";
  const on = (o) => !!o && (confirmed(o) || preview());
  const tbc = (o) => (preview() && o && !confirmed(o)) ? `<span class="tbc" title="${esc(ui("tbcTip"))}">${esc(ui("tbc"))}</span>` : "";
  const name = () => C.clinic.name.value;

  const P = {
    stethoscope: '<path d="M11 2v2M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    baby: '<path d="M9 12h.01M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>',
    mother: '<circle cx="12" cy="4.5" r="2.2"/><path d="M12 7.5c-2.2 0-3.6 1.6-3.6 3.6 0 1.3.5 2.3 1.4 3V21h4.4v-6.9c1-.7 1.6-1.7 1.6-3 0-2-1.4-3.6-3.8-3.6Z"/>',
    pulse: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.500l7 7Z"/><path d="M3.2 12h6.300l.5-1 2 4.500 2-7 1.500 3.500h5.300"/>',
    flask: '<path d="M10 2v7.500a2 2 0 0 1-.2.900L4.700 20.500a1 1 0 0 0 .9 1.500h12.800a1 1 0 0 0 .9-1.500L14.200 10.400a2 2 0 0 1-.2-.9V2"/><path d="M8.500 2h7M7 16h10"/>',
    pill: '<path d="m10.500 20.500 10-10a4.950 4.950 0 1 0-7-7l-10 10a4.950 4.950 0 1 0 7 7Z"/><path d="m8.500 8.500 7 7"/>',
    cross: '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>',
    eye: '<path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    heart: '<path d="M19 14c1.500-1.500 3-3.200 3-5.500A5.500 5.500 0 0 0 16.500 3c-1.800 0-3 .5-4.500 2-1.500-1.500-2.700-2-4.500-2A5.500 5.500 0 0 0 2 8.500c0 2.300 1.500 4 3 5.500l7 7Z"/>',
    shield: '<path d="M12 3 4.500 6v5.500c0 4.500 3.100 8 7.500 9.500 4.400-1.500 7.500-5 7.500-9.500V6L12 3Z"/><path d="m8.800 12 2.400 2.400 4.200-4.600"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.500 2"/>',
    pin: '<path d="M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21Z"/><circle cx="12" cy="9.500" r="2.500"/>',
    phone: '<path d="M5 4h3.500l1.600 4-2.200 1.400a11 11 0 0 0 6.700 6.700L16 14l4 1.600V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.500"/><path d="m3.500 7.500 8.500 6 8.500-6"/>',
    check: '<path d="m5 12.500 4.500 4.500L19 7.500"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    calendar: '<rect x="3" y="4.500" width="18" height="16" rx="3"/><path d="M8 2.500v4M16 2.500v4M3 10h18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    chat: '<path d="M7.900 20A9 9 0 1 0 4 16.100L2 22Z"/><path d="M9 9.500c.4 2 2.500 4 4.500 4.500l1.300-1.300-1.900-1-.7.700a3.500 3.500 0 0 1-1.600-1.600l.7-.7-1-1.900Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'
  };
  const ic = (n) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[n] || P.cross}</svg>`;

  const art = (fit) => `<svg class="art" viewBox="0 0 400 480" preserveAspectRatio="${fit}" aria-hidden="true" focusable="false">
    <circle cx="200" cy="215" r="150" fill="#fff" opacity=".7"/>
    <circle cx="200" cy="215" r="112" fill="none" stroke="#1884cc" stroke-width="3" opacity=".35"/>
    <circle cx="200" cy="215" r="132" fill="none" stroke="#62a83c" stroke-width="3" opacity=".45"/>
    <g stroke-linecap="round" stroke-linejoin="round">
      <g fill="#62a83c" stroke="#62a83c">
        <circle cx="150" cy="168" r="18" stroke="none"/>
        <path d="M150 192 128 262h44Z" stroke-width="6"/>
        <path d="M140 214 118 165M160 214 182 158M140 262v50M160 262v50" fill="none" stroke-width="9"/>
      </g>
      <g fill="#1884cc" stroke="#1884cc">
        <circle cx="244" cy="138" r="20" stroke="none"/>
        <rect x="226" y="164" width="36" height="84" rx="14" stroke="none"/>
        <path d="M230 180 208 120M258 180 282 122M236 246v76M252 246v76" fill="none" stroke-width="10"/>
      </g>
    </g>
    <path d="M56 372C130 336 236 332 346 354 282 392 160 410 56 372Z" fill="#f09c18"/>
    <path d="M96 366C150 352 220 350 300 362" fill="none" stroke="#fff" stroke-width="3" opacity=".45" stroke-linecap="round"/>
  </svg>`;

  const imgBlock = (key, fit) => {
    const im = C.images[key];
    if (im && im.src && on(im)) {
      return `<img class="photo" src="${esc(im.src)}" alt="${esc(tr(im.alt))}" loading="lazy">${tbc(im) ? `<span class="ph-note">${esc(ui("tbc"))}</span>` : ""}`;
    }
    return art(fit) + (preview() ? `<span class="ph-note">${esc(ui("imgNote"))}</span>` : "");
  };

  const digits = (v) => String(v || "").replace(/\D/g, "");
  const waNum = (v) => { let d = digits(v); if (d.startsWith("0")) d = "255" + d.slice(1); return d; };
  const chanItem = () => (C.enquiry.channel === "email" ? C.contact.email : C.contact.whatsapp);
  const chanReady = () => confirmed(chanItem()) && !!chanItem().value;
  const enqVisible = () => !!C.enquiry.enabled && (chanReady() || preview());
  const bookHref = () => (enqVisible() ? "appointments.html" : "contact.html");

  const visServices = () => C.services.filter(on);
  const visDoctors = () => C.doctors.filter((d) => on(d) && (d.consent === true || preview()));
  const visTips = () => C.tips.filter(on);

  const field = (item, kind, icon, labelKey) => {
    if (!on(item) || !(item.value || tr(item))) return "";
    const v = item.value;
    let body;
    if (kind === "text") body = `<span class="val-t">${esc(tr(item))}</span>`;
    else {
      const href = kind === "tel" ? `tel:+${digits(v)}` : kind === "wa" ? `https://wa.me/${waNum(v)}` : `mailto:${esc(v)}`;
      body = confirmed(item) ? `<a href="${href}"${kind === "wa" ? ' target="_blank" rel="noopener"' : ""}>${esc(v)}</a>` : `<span class="val-t">${esc(v)}</span>`;
    }
    return `<div class="info-item">${ic(icon)}<div><b>${esc(ui(labelKey))}${tbc(item)}</b>${body}</div></div>`;
  };

  const topbar = () => {
    const c = C.contact;
    const li = (item, icon, text, href, cls) => on(item) && text
      ? `<li class="${cls || ""}">${ic(icon)}${confirmed(item) && href ? `<a href="${href}">${esc(text)}</a>` : `<span>${esc(text)}</span>`}${tbc(item)}</li>` : "";
    return `<div class="topbar"><div class="wrap"><ul>
      ${li(c.address, "pin", tr(c.address), "", "hide-sm")}
      ${li(c.phone, "phone", c.phone.value, `tel:+${digits(c.phone.value)}`)}
      ${li(c.email, "mail", c.email.value, `mailto:${esc(c.email.value)}`, "hide-sm")}
    </ul>
    <div class="lang" role="group" aria-label="${esc(ui("language"))}">
      <button type="button" data-act="lang" data-v="en" aria-pressed="${state.lang === "en"}">EN</button>
      <button type="button" data-act="lang" data-v="sw" aria-pressed="${state.lang === "sw"}">SW</button>
    </div></div></div>`;
  };

  const header = () => {
    const items = [
      ["home", "index.html", true], ["about", "about.html", true], ["services", "services.html", true],
      ["doctors", "doctors.html", visDoctors().length > 0], ["appointments", "appointments.html", enqVisible()],
      ["tips", "health-tips.html", visTips().length > 0], ["contact", "contact.html", true]
    ];
    const links = items.filter((i) => i[2]).map((i) => `<a class="link" href="${i[1]}"${PAGE === i[0] ? ' aria-current="page"' : ""}>${esc(tr(C.ui.nav[i[0]]))}</a>`).join("");
    return `<header class="header"><div class="wrap">
      <a class="brand" href="index.html"><img src="${esc(C.clinic.logo.src)}" alt="${esc(name())}" height="72"></a>
      <button type="button" class="menu-btn" data-act="menu" aria-expanded="false" aria-controls="nav" aria-label="${esc(ui("menu"))}">${ic("menu")}</button>
      <nav class="nav" id="nav" aria-label="${esc(ui("menu"))}">${links}<a class="btn btn-primary sm" href="${bookHref()}">${ic("calendar")}${esc(ui("book"))}</a></nav>
    </div></header>`;
  };

  const footer = () => {
    const c = C.contact;
    const links = [["about", "about.html"], ["services", "services.html"], ["contact", "contact.html"]];
    if (visDoctors().length) links.push(["doctors", "doctors.html"]);
    if (enqVisible()) links.push(["appointments", "appointments.html"]);
    if (visTips().length) links.push(["tips", "health-tips.html"]);
    const row = (item, icon, html) => on(item) && html ? `<li>${ic(icon)}<span>${html}${tbc(item)}</span></li>` : "";
    const socials = c.social.filter((s) => s.url && on(s)).map((s) => `<li>${ic("arrow")}<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>${tbc(s)}</li>`).join("");
    return `<footer class="footer"><div class="wrap">
      <div><img src="${esc(C.clinic.logo.src)}" alt="${esc(name())}" width="64" height="64">${on(C.clinic.intro) ? `<p>${esc(tr(C.clinic.intro))}${tbc(C.clinic.intro)}</p>` : ""}</div>
      <div><h2>${esc(ui("quickLinks"))}</h2><ul>${links.map((l) => `<li><a href="${l[1]}">${esc(tr(C.ui.nav[l[0]]))}</a></li>`).join("")}</ul></div>
      <div><h2>${esc(ui("getInTouch"))}</h2><ul>
        ${row(c.address, "pin", esc(tr(c.address)))}
        ${row(c.phone, "phone", confirmed(c.phone) ? `<a href="tel:+${digits(c.phone.value)}">${esc(c.phone.value)}</a>` : esc(c.phone.value))}
        ${row(c.email, "mail", confirmed(c.email) ? `<a href="mailto:${esc(c.email.value)}">${esc(c.email.value)}</a>` : esc(c.email.value))}
        ${row(c.hours, "clock", esc(tr(c.hours)))}
        ${socials}
      </ul></div>
    </div><div class="wrap legal">&copy; ${new Date().getFullYear()} ${esc(name())}. ${esc(ui("rights"))}</div></footer>`;
  };

  const pageHead = (title, intro) => `<div class="page-head"><div class="wrap"><h1 class="rise">${esc(title)}</h1>${intro ? `<p class="lede rise d1">${esc(intro)}</p>` : ""}</div></div>`;
  const soon = () => `<div class="soon">${esc(ui("soon"))}</div>`;

  const enqForm = () => {
    if (!enqVisible()) return "";
    const opts = visServices().map((s) => `<option value="${esc(tr(s.name))}">${esc(tr(s.name))}</option>`).join("");
    const d = new Date(); const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return `<div class="card"><form id="enq" novalidate>
      <div class="row2">
        <label>${esc(ui("f_name"))}<input name="name" autocomplete="name" required></label>
        <label>${esc(ui("f_phone"))}<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
      </div>
      <div class="row2">
        <label>${esc(ui("f_date"))}<input name="date" type="date" min="${today}"></label>
        <label>${esc(ui("f_service"))}<select name="service"><option value="">${esc(ui("f_any"))}</option>${opts}</select></label>
      </div>
      <label>${esc(ui("f_message"))}<textarea name="message" maxlength="400"></textarea></label>
      <p class="note">${ic("info")}<span>${esc(ui("f_privacy"))}</span></p>
      <p class="msg" id="enq-msg" role="status" aria-live="polite"></p>
      <button class="btn btn-primary" type="submit">${ic(C.enquiry.channel === "email" ? "mail" : "chat")}${esc(ui("f_send"))}</button>
    </form></div>`;
  };

  const hero = () => {
    const taglineOn = on(C.clinic.tagline);
    const hl = C.highlights.filter(on).map((h) => `<li>${ic(h.icon)}<span>${esc(tr(h))}${tbc(h)}</span></li>`).join("");
    return `<section class="hero"><div class="wrap">
      <div>
        <h1 class="rise">${esc(taglineOn ? tr(C.clinic.tagline) : name())}${taglineOn ? tbc(C.clinic.tagline) : ""}</h1>
        ${on(C.clinic.intro) ? `<p class="lede rise d1">${esc(tr(C.clinic.intro))}${tbc(C.clinic.intro)}</p>` : ""}
        <div class="cta-row rise d2">
          <a class="btn btn-primary" href="${bookHref()}">${ic("calendar")}${esc(ui("book"))}</a>
          <a class="btn btn-ghost" href="services.html">${esc(ui("explore"))}</a>
        </div>
        ${hl ? `<ul class="trust rise d3">${hl}</ul>` : ""}
      </div>
      <div class="arch-wrap pop"><div class="arch-ring" aria-hidden="true"></div><div class="arch">${imgBlock("hero", "xMidYMid slice")}</div></div>
    </div></section>`;
  };

  const servicesStrip = () => {
    const list = visServices().slice(0, 6);
    return `<section class="sec"><div class="wrap">
      <div class="head-row"><div><h2 class="h2">${esc(ui("servicesTitle"))}</h2><p class="lede">${esc(ui("servicesIntro"))}</p></div>
      <a class="btn btn-ghost" href="services.html">${esc(ui("viewAll"))}${ic("arrow")}</a></div>
      ${list.length ? `<div class="svc-grid">${list.map((s) => `<a class="svc" href="services.html#${esc(s.id)}">${ic(s.icon)}<strong>${esc(tr(s.name))}</strong>${tbc(s)}</a>`).join("")}</div>` : soon()}
    </div></section>`;
  };

  const whySection = () => {
    const w = C.why;
    const pts = w.points.filter(on);
    if (!(on(w.title) || on(w.text) || pts.length)) return "";
    return `<section class="sec tint"><div class="wrap"><div class="why">
      <div class="why-copy">
        ${on(w.title) ? `<h2 class="h2">${esc(tr(w.title))}${tbc(w.title)}</h2>` : ""}
        ${on(w.text) ? `<p class="lede">${esc(tr(w.text))}${tbc(w.text)}</p>` : ""}
        ${pts.length ? `<ul class="checks">${pts.map((p) => `<li>${ic("check")}<span>${esc(tr(p))}${tbc(p)}</span></li>`).join("")}</ul>` : ""}
        <div><a class="btn btn-primary" href="about.html">${esc(ui("learnMore"))}${ic("arrow")}</a></div>
      </div>
      <div class="why-media">${imgBlock("why", "xMidYMid meet")}${on(C.clinic.tagline) ? `<div class="badge-float">${ic("heart")}<span>${esc(ui("tag_short"))}</span></div>` : ""}</div>
    </div></div></section>`;
  };

  const band = () => `<section class="sec"><div class="wrap"><div class="band">
    <div><h2>${esc(ui("bookTitle"))}</h2><p>${esc(ui("bookText"))}</p></div>
    <a class="btn btn-light" href="${bookHref()}">${ic("calendar")}${esc(ui("book"))}</a>
  </div></div></section>`;

  const pages = {
    home: () => hero() + servicesStrip() + whySection() + band(),

    about: () => {
      const a = C.about;
      const vals = a.values.filter(on);
      const copy = (on(a.story) ? `<p>${esc(tr(a.story))}${tbc(a.story)}</p>` : "") +
        (on(a.mission) ? `<h2 class="h2" style="font-size:1.6rem;margin-top:.8rem">${esc(ui("mission"))}</h2><p>${esc(tr(a.mission))}${tbc(a.mission)}</p>` : "");
      return pageHead(ui("aboutTitle"), on(C.clinic.intro) ? tr(C.clinic.intro) : "") +
        `<section class="sec"><div class="wrap"><div class="split">
          <div class="prose">${copy || soon()}</div>
          <div class="frame">${imgBlock("about", "xMidYMid meet")}</div>
        </div>${vals.length ? `<h2 class="h2" style="font-size:1.8rem;margin-top:3rem">${esc(ui("values"))}</h2><div class="vals">${vals.map((v) => `<div class="val"><h3>${esc(tr(v.title))}${tbc(v)}</h3><p>${esc(tr(v.text))}</p></div>`).join("")}</div>` : ""}</div></section>` + band();
    },

    services: () => {
      const list = visServices();
      return pageHead(ui("servicesPage"), ui("servicesIntro")) +
        `<section class="sec"><div class="wrap">${list.length ? `<div class="svc-list">${list.map((s) => `<article class="svc-card" id="${esc(s.id)}">${ic(s.icon)}<h3>${esc(tr(s.name))}${tbc(s)}</h3><p>${esc(tr(s.desc))}</p></article>`).join("")}</div>` : soon()}</div></section>` + band();
    },

    doctors: () => {
      const list = visDoctors();
      return pageHead(ui("doctorsPage"), ui("doctorsIntro")) +
        `<section class="sec"><div class="wrap">${list.length ? `<div class="docs">${list.map((d) => `<article class="doc"><div class="pic">${d.photo && d.consent ? `<img src="${esc(d.photo)}" alt="${esc(d.name)}" loading="lazy">` : ic("user")}</div><div class="meta"><h3>${esc(d.name)}${tbc(d)}</h3><span class="role">${esc(tr(d.title))}</span><p>${esc(tr(d.bio))}</p></div></article>`).join("")}</div>` : soon()}</div></section>` + band();
    },

    tips: () => {
      const list = visTips();
      return pageHead(ui("tipsPage"), ui("tipsIntro")) +
        `<section class="sec"><div class="wrap">${list.length ? `<div class="tips">${list.map((t) => `<article class="tip"><h3>${esc(tr(t.title))}${tbc(t)}</h3><p>${esc(tr(t.text))}</p></article>`).join("")}</div>` : soon()}</div></section>`;
    },

    appointments: () => {
      const c = C.contact;
      return pageHead(ui("apptPage"), ui("apptIntro")) +
        `<section class="sec"><div class="wrap"><div class="contact">
          <div class="info">${field(c.hours, "text", "clock", "hours")}${field(c.phone, "tel", "phone", "callUs")}${field(c.whatsapp, "wa", "chat", "whatsapp")}
            <p class="note">${ic("info")}<span>${esc(on(c.emergency) && tr(c.emergency) ? tr(c.emergency) : ui("emergencyDefault"))}</span></p></div>
          ${enqForm() || soon()}
        </div></div></section>`;
    },

    contact: () => {
      const c = C.contact;
      const map = on(c.mapLink) && c.mapLink.value
        ? `<div class="info-item">${ic("pin")}<div><b>${esc(ui("directions"))}${tbc(c.mapLink)}</b>${confirmed(c.mapLink) ? `<a href="${esc(c.mapLink.value)}" target="_blank" rel="noopener">${esc(ui("directions"))}</a>` : `<span class="val-t">${esc(c.mapLink.value)}</span>`}</div></div>`
        : (preview() ? `<div class="info-item">${ic("pin")}<div><b>${esc(ui("directions"))}${tbc(c.mapLink)}</b></div></div>` : "");
      const body = [field(c.address, "text", "pin", "address"), map, field(c.phone, "tel", "phone", "callUs"), field(c.whatsapp, "wa", "chat", "whatsapp"), field(c.email, "mail", "mail", "email"), field(c.hours, "text", "clock", "hours")].join("");
      return pageHead(ui("contactPage"), ui("contactIntro")) +
        `<section class="sec"><div class="wrap"><div class="contact">
          <div class="info">${body || soon()}<p class="note">${ic("info")}<span>${esc(on(c.emergency) && tr(c.emergency) ? tr(c.emergency) : ui("emergencyDefault"))}</span></p></div>
          ${enqForm()}
        </div></div></section>`;
    }
  };

  const pendingItems = () => {
    const L = []; const add = (item, label) => { if (item && item.status !== "confirmed") L.push(label); };
    const c = C.contact;
    add(C.clinic.tagline, "Tagline"); add(C.clinic.intro, "Short clinic description");
    add(c.phone, "Phone number"); add(c.whatsapp, "WhatsApp number"); add(c.email, "Email address");
    add(c.address, "Address"); add(c.mapLink, "Google Maps link"); add(c.hours, "Opening hours");
    if (c.emergency.en || c.emergency.sw) add(c.emergency, "Emergency instructions");
    c.social.forEach((s) => { if (s.url) add(s, `${s.label} link`); });
    C.highlights.forEach((h) => add(h, `Highlight: ${h.en}`));
    C.services.forEach((s) => add(s, `Service: ${s.name.en}`));
    add(C.why.title, "Why choose us: heading"); add(C.why.text, "Why choose us: text");
    C.why.points.forEach((p) => add(p, `Why choose us: ${p.en}`));
    add(C.about.story, "About: story"); add(C.about.mission, "About: mission");
    C.about.values.forEach((v) => add(v, `About value: ${v.title.en}`));
    C.doctors.forEach((d, i) => { add(d, `Doctor profile ${i + 1}`); if (!d.consent) L.push(`Doctor profile ${i + 1}: written consent`); });
    C.tips.forEach((t, i) => add(t, `Health tip ${i + 1}`));
    Object.keys(C.images).forEach((k) => add(C.images[k], `Photo: ${k}`));
    return L;
  };

  const renderPv = () => {
    if (C.mode === "live") { pvRoot.innerHTML = ""; return; }
    const list = pendingItems();
    pvRoot.innerHTML = `<div class="pv">
      <div class="pv-panel" id="pv-panel"${state.panel ? "" : " hidden"}><h3>${esc(ui("prev_list"))}</h3>${list.length ? `<ul>${list.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : `<p>${esc(ui("prev_done"))}</p>`}</div>
      <div class="pv-bar"><span>${esc(ui("prev_mode"))}: <b>${list.length}</b> ${esc(ui("prev_items"))}</span>
        <button type="button" data-act="view" data-v="preview" aria-pressed="${state.view === "preview"}">${esc(ui("prev_show"))}</button>
        <button type="button" data-act="view" data-v="live" aria-pressed="${state.view === "live"}">${esc(ui("prev_live"))}</button>
        <button type="button" data-act="panel" aria-expanded="${state.panel}" aria-controls="pv-panel">${esc(ui("prev_list"))}</button>
      </div></div>`;
  };

  const waFloat = () => {
    const w = C.contact.whatsapp;
    if (!on(w) || !C.enquiry.enabled) return "";
    return confirmed(w)
      ? `<a class="wa-float" href="https://wa.me/${waNum(w.value)}" target="_blank" rel="noopener" aria-label="${esc(ui("whatsapp"))}">${ic("chat")}</a>`
      : `<button type="button" class="wa-float is-off" data-act="wa-off" aria-label="${esc(ui("whatsapp"))}">${ic("chat")}</button>`;
  };

  const meta = () => {
    const titles = { home: "", about: ui("aboutTitle"), services: ui("servicesPage"), doctors: ui("doctorsPage"), tips: ui("tipsPage"), appointments: ui("apptPage"), contact: ui("contactPage") };
    document.title = titles[PAGE] ? `${titles[PAGE]} | ${name()}` : (on(C.clinic.tagline) && confirmed(C.clinic.tagline) ? `${name()} | ${tr(C.clinic.tagline)}` : name());
    document.documentElement.lang = state.lang;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = confirmed(C.clinic.intro) ? tr(C.clinic.intro) : name();
    let s = document.getElementById("ld");
    if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = "ld"; document.head.appendChild(s); }
    const c = C.contact; const ld = { "@context": "https://schema.org", "@type": "MedicalClinic", name: name() };
    if (confirmed(C.clinic.logo)) ld.logo = new URL(C.clinic.logo.src, location.href).href;
    if (confirmed(c.phone)) ld.telephone = c.phone.value;
    if (confirmed(c.email)) ld.email = c.email.value;
    if (confirmed(c.address)) ld.address = tr(c.address);
    if (confirmed(c.hours)) ld.openingHours = tr(c.hours);
    s.textContent = JSON.stringify(ld);
  };

  const saveForm = () => { const f = document.getElementById("enq"); if (!f) return null; const o = {}; new FormData(f).forEach((v, k) => { o[k] = v; }); return o; };
  const restoreForm = (o) => { const f = document.getElementById("enq"); if (!f || !o) return; Object.keys(o).forEach((k) => { if (f.elements[k]) f.elements[k].value = o[k]; }); };

  const render = (focusSel) => {
    const saved = saveForm();
    const y = window.scrollY;
    root.innerHTML = `<a class="skip" href="#main">${esc(ui("skip"))}</a>${topbar()}${header()}<main id="main" tabindex="-1">${pages[PAGE]()}</main>${footer()}${waFloat()}`;
    restoreForm(saved); meta(); renderPv();
    window.scrollTo(0, y);
    if (focusSel) { const el = document.querySelector(focusSel); if (el) el.focus({ preventScroll: true }); }
  };

  let toastTimer;
  const toast = (t) => { toastEl.textContent = t; toastEl.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3800); };

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const act = b.dataset.act;
    if (act === "lang") { state.lang = b.dataset.v; store.set("lupyana.lang", state.lang); render(`[data-act="lang"][data-v="${state.lang}"]`); }
    else if (act === "view") { state.view = b.dataset.v; store.set("lupyana.view", state.view); render(); const t = pvRoot.querySelector(`[data-act="view"][data-v="${state.view}"]`); if (t) t.focus(); }
    else if (act === "panel") { state.panel = !state.panel; renderPv(); const t = pvRoot.querySelector('[data-act="panel"]'); if (t) t.focus(); }
    else if (act === "menu") { const n = document.getElementById("nav"); const open = n.classList.toggle("open"); b.setAttribute("aria-expanded", open); b.innerHTML = ic(open ? "x" : "menu"); }
    else if (act === "wa-off") toast(ui("f_off"));
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id !== "enq") return;
    e.preventDefault();
    const f = e.target; const msg = document.getElementById("enq-msg");
    const show = (t, cls) => { msg.textContent = t; msg.className = "msg show " + cls; };
    const v = (k) => (f.elements[k].value || "").trim();
    if (!v("name") || !digits(v("phone"))) { show(ui("f_required"), "err"); (v("name") ? f.elements.phone : f.elements.name).focus(); return; }
    if (!chanReady()) { show(ui("f_off"), "err"); return; }
    const lines = [ui("f_msgHello"), `${ui("f_name")}: ${v("name")}`, `${ui("f_phone")}: ${v("phone")}`];
    if (v("date")) lines.push(`${ui("f_date")}: ${v("date")}`);
    if (v("service")) lines.push(`${ui("f_service")}: ${v("service")}`);
    if (v("message")) lines.push(v("message"));
    const text = lines.join("\n");
    const url = C.enquiry.channel === "email"
      ? `mailto:${chanItem().value}?subject=${encodeURIComponent(ui("book") + " - " + v("name"))}&body=${encodeURIComponent(text)}`
      : `https://wa.me/${waNum(chanItem().value)}?text=${encodeURIComponent(text)}`;
    show(ui("f_opened"), "ok");
    window.open(url, C.enquiry.channel === "email" ? "_self" : "_blank", "noopener");
  });

  render();
})();
