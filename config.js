/*
  Lupyana Polyclinic - site content.
  Edit this file only. Every item has a status:
    "confirmed"  approved by the clinic, shown on the live site
    "pending"    placeholder, shown only in preview mode with a "To be confirmed" badge
  To publish an item, replace its text and change status to "confirmed".
  When every item you want is confirmed, set mode to "live".
  Text fields take { en: "...", sw: "..." }. A missing sw falls back to en.
*/
window.SITE_CONFIG = {
  mode: "preview",
  defaultLang: "en",

  clinic: {
    name: { value: "Lupyana Polyclinic", status: "confirmed" },
    logo: { src: "assets/img/logo-trim.jpg", status: "confirmed" },
    tagline: {
      en: "Your health, our priority",
      sw: "Afya yako, kipaumbele chetu",
      status: "pending"
    },
    intro: {
      en: "Quality healthcare services and compassionate care for you and your family.",
      sw: "Huduma bora za afya na huduma ya upendo kwa wewe na familia yako.",
      status: "pending"
    }
  },

  contact: {
    phone:    { value: "+255 000 000 000", status: "pending" },
    whatsapp: { value: "+255 000 000 000", status: "pending" },
    email:    { value: "clinic@example.com", status: "pending" },
    address: {
      en: "Street, Ward, District, Region",
      sw: "Mtaa, Kata, Wilaya, Mkoa",
      status: "pending"
    },
    mapLink: { value: "", status: "pending" },
    hours: {
      en: "Monday to Saturday, 8:00 am to 5:00 pm",
      sw: "Jumatatu hadi Jumamosi, saa 2:00 asubuhi hadi saa 11:00 jioni",
      status: "pending"
    },
    emergency: {
      en: "",
      sw: "",
      status: "pending"
    },
    social: [
      { label: "Facebook",  url: "", status: "pending" },
      { label: "Instagram", url: "", status: "pending" }
    ]
  },

  enquiry: {
    enabled: true,
    channel: "whatsapp"
  },

  highlights: [
    { icon: "shield",  en: "Qualified medical team", sw: "Timu ya wataalamu wa afya", status: "pending" },
    { icon: "heart",   en: "Care for the whole family", sw: "Huduma kwa familia nzima", status: "pending" },
    { icon: "clock",   en: "Clear opening hours", sw: "Muda wa kazi unaoeleweka", status: "pending" }
  ],

  services: [
    { id: "general",    icon: "stethoscope", status: "pending",
      name: { en: "General medicine", sw: "Tiba ya jumla" },
      desc: { en: "Consultation and treatment for common conditions.", sw: "Ushauri na matibabu ya magonjwa ya kawaida." } },
    { id: "pediatrics", icon: "baby", status: "pending",
      name: { en: "Pediatrics", sw: "Afya ya watoto" },
      desc: { en: "Healthcare for babies, children and teenagers.", sw: "Huduma za afya kwa watoto wachanga, watoto na vijana." } },
    { id: "maternal",   icon: "mother", status: "pending",
      name: { en: "Gynecology and obstetrics", sw: "Afya ya uzazi na wanawake" },
      desc: { en: "Women's health and maternity care.", sw: "Afya ya wanawake na huduma za uzazi." } },
    { id: "internal",   icon: "pulse", status: "pending",
      name: { en: "Internal medicine", sw: "Magonjwa ya ndani" },
      desc: { en: "Diagnosis and long-term care for adult conditions.", sw: "Uchunguzi na matibabu ya muda mrefu kwa watu wazima." } },
    { id: "lab",        icon: "flask", status: "pending",
      name: { en: "Laboratory", sw: "Maabara" },
      desc: { en: "Tests and diagnostic services.", sw: "Vipimo na huduma za uchunguzi." } },
    { id: "pharmacy",   icon: "pill", status: "pending",
      name: { en: "Pharmacy", sw: "Duka la dawa" },
      desc: { en: "Prescribed medicines and pharmacy advice.", sw: "Dawa za maagizo na ushauri wa mfamasia." } }
  ],

  why: {
    title: { en: "Care you can rely on", sw: "Huduma unayoweza kuitegemea", status: "pending" },
    text: {
      en: "We are committed to patient-centred care delivered with professionalism and compassion.",
      sw: "Tumejitolea kutoa huduma inayomweka mgonjwa mbele kwa weledi na upendo.",
      status: "pending"
    },
    points: [
      { en: "A skilled and caring medical team", sw: "Timu ya wataalamu wenye ujuzi na upendo", status: "pending" },
      { en: "Well-equipped consultation and diagnostic rooms", sw: "Vyumba vya matibabu na uchunguzi vyenye vifaa", status: "pending" },
      { en: "Affordable and accessible care", sw: "Huduma nafuu na zinazofikika", status: "pending" },
      { en: "A welcoming, supportive environment", sw: "Mazingira ya ukarimu na msaada", status: "pending" }
    ]
  },

  about: {
    story: {
      en: "Our clinic's story, background and mission will be written here once the clinic approves the text.",
      sw: "Historia, usuli na dhamira ya kliniki yetu vitaandikwa hapa baada ya kliniki kuidhinisha maandishi.",
      status: "pending"
    },
    mission: {
      en: "Our mission statement.",
      sw: "Dhamira yetu.",
      status: "pending"
    },
    values: [
      { title: { en: "Compassion", sw: "Huruma" }, text: { en: "Value description.", sw: "Maelezo ya thamani." }, status: "pending" },
      { title: { en: "Professionalism", sw: "Weledi" }, text: { en: "Value description.", sw: "Maelezo ya thamani." }, status: "pending" },
      { title: { en: "Access for everyone", sw: "Huduma kwa wote" }, text: { en: "Value description.", sw: "Maelezo ya thamani." }, status: "pending" }
    ]
  },

  doctors: [
    { name: "Doctor name", photo: "", consent: false, status: "pending",
      title: { en: "Job title", sw: "Cheo" },
      bio: { en: "Approved short biography and areas of practice.", sw: "Wasifu mfupi ulioidhinishwa na fani za kazi." } },
    { name: "Doctor name", photo: "", consent: false, status: "pending",
      title: { en: "Job title", sw: "Cheo" },
      bio: { en: "Approved short biography and areas of practice.", sw: "Wasifu mfupi ulioidhinishwa na fani za kazi." } },
    { name: "Doctor name", photo: "", consent: false, status: "pending",
      title: { en: "Job title", sw: "Cheo" },
      bio: { en: "Approved short biography and areas of practice.", sw: "Wasifu mfupi ulioidhinishwa na fani za kazi." } }
  ],

  tips: [
    { status: "pending",
      title: { en: "Health tip title", sw: "Kichwa cha kidokezo cha afya" },
      text: { en: "Health advice written or approved by the clinic's medical team.", sw: "Ushauri wa afya ulioandikwa au kuidhinishwa na timu ya matibabu ya kliniki." } },
    { status: "pending",
      title: { en: "Health tip title", sw: "Kichwa cha kidokezo cha afya" },
      text: { en: "Health advice written or approved by the clinic's medical team.", sw: "Ushauri wa afya ulioandikwa au kuidhinishwa na timu ya matibabu ya kliniki." } },
    { status: "pending",
      title: { en: "Health tip title", sw: "Kichwa cha kidokezo cha afya" },
      text: { en: "Health advice written or approved by the clinic's medical team.", sw: "Ushauri wa afya ulioandikwa au kuidhinishwa na timu ya matibabu ya kliniki." } }
  ],

  images: {
    hero:  { src: "", status: "pending", alt: { en: "Lupyana Polyclinic team", sw: "Timu ya Lupyana Polyclinic" } },
    why:   { src: "", status: "pending", alt: { en: "A patient being cared for at the clinic", sw: "Mgonjwa akihudumiwa kliniki" } },
    about: { src: "", status: "pending", alt: { en: "Lupyana Polyclinic building", sw: "Jengo la Lupyana Polyclinic" } }
  },

  ui: {
    nav: {
      home:         { en: "Home", sw: "Nyumbani" },
      about:        { en: "About", sw: "Kuhusu sisi" },
      services:     { en: "Services", sw: "Huduma" },
      doctors:      { en: "Our doctors", sw: "Madaktari wetu" },
      appointments: { en: "Appointments", sw: "Miadi" },
      tips:         { en: "Health tips", sw: "Vidokezo vya afya" },
      contact:      { en: "Contact", sw: "Mawasiliano" }
    },
    book:        { en: "Book an appointment", sw: "Weka miadi" },
    explore:     { en: "Explore our services", sw: "Tazama huduma zetu" },
    viewAll:     { en: "View all services", sw: "Tazama huduma zote" },
    learnMore:   { en: "Learn more about us", sw: "Jifunze zaidi kuhusu sisi" },
    servicesTitle: { en: "Comprehensive care under one roof", sw: "Huduma kamili chini ya paa moja" },
    servicesIntro: { en: "From general medicine to specialised care, we are here for you.", sw: "Kuanzia tiba ya jumla hadi huduma maalum, tupo kwa ajili yako." },
    bookTitle:   { en: "Get the care you need, when you need it", sw: "Pata huduma unayohitaji, unapoihitaji" },
    bookText:    { en: "Send an appointment request and the clinic will get back to you.", sw: "Tuma ombi la miadi na kliniki itawasiliana nawe." },
    tbc:         { en: "To be confirmed", sw: "Inasubiri uthibitisho" },
    tbcTip:      { en: "Placeholder. Replace it in config.js and mark it confirmed.", sw: "Mfano wa muda. Ubadilishe katika config.js kisha uuthibitishe." },
    soon:        { en: "This information is being prepared and will be added soon.", sw: "Taarifa hii inaandaliwa na itawekwa hivi karibuni." },
    skip:        { en: "Skip to content", sw: "Ruka hadi maudhui" },
    menu:        { en: "Menu", sw: "Menyu" },
    language:    { en: "Language", sw: "Lugha" },
    callUs:      { en: "Call", sw: "Piga simu" },
    whatsapp:    { en: "WhatsApp", sw: "WhatsApp" },
    email:       { en: "Email", sw: "Barua pepe" },
    address:     { en: "Address", sw: "Anwani" },
    hours:       { en: "Opening hours", sw: "Muda wa kazi" },
    directions:  { en: "Get directions", sw: "Pata maelekezo" },
    emergency:   { en: "Emergencies", sw: "Dharura" },
    emergencyDefault: { en: "In an emergency, go to the nearest health facility.", sw: "Katika dharura, nenda kwenye kituo cha afya kilicho karibu nawe." },
    quickLinks:  { en: "Quick links", sw: "Viungo vya haraka" },
    getInTouch:  { en: "Get in touch", sw: "Wasiliana nasi" },
    rights:      { en: "All rights reserved.", sw: "Haki zote zimehifadhiwa." },
    aboutTitle:  { en: "About us", sw: "Kuhusu sisi" },
    mission:     { en: "Our mission", sw: "Dhamira yetu" },
    values:      { en: "What we value", sw: "Tunachothamini" },
    servicesPage:{ en: "Our services", sw: "Huduma zetu" },
    doctorsPage: { en: "Our doctors and medical team", sw: "Madaktari na timu yetu ya matibabu" },
    doctorsIntro:{ en: "Meet the professionals who care for our patients.", sw: "Kutana na wataalamu wanaohudumia wagonjwa wetu." },
    tipsPage:    { en: "Health tips", sw: "Vidokezo vya afya" },
    tipsIntro:   { en: "Advice from the clinic's medical team.", sw: "Ushauri kutoka kwa timu ya matibabu ya kliniki." },
    contactPage: { en: "Contact us", sw: "Wasiliana nasi" },
    contactIntro:{ en: "Reach the clinic by phone, WhatsApp or email, or visit us.", sw: "Wasiliana na kliniki kwa simu, WhatsApp au barua pepe, au tembelea." },
    apptPage:    { en: "Request an appointment", sw: "Omba miadi" },
    apptIntro:   { en: "Fill in the form and we will reply to confirm a time.", sw: "Jaza fomu na tutakujibu kuthibitisha muda." },
    f_name:      { en: "Full name", sw: "Jina kamili" },
    f_phone:     { en: "Phone number", sw: "Namba ya simu" },
    f_date:      { en: "Preferred date", sw: "Tarehe unayopendelea" },
    f_service:   { en: "Service", sw: "Huduma" },
    f_any:       { en: "Not sure yet", sw: "Sijui bado" },
    f_message:   { en: "Short message (optional)", sw: "Ujumbe mfupi (si lazima)" },
    f_send:      { en: "Send request", sw: "Tuma ombi" },
    f_privacy:   { en: "Please do not include medical history, diagnoses or prescriptions in this form.", sw: "Tafadhali usiweke historia ya matibabu, utambuzi wa ugonjwa wala maagizo ya dawa kwenye fomu hii." },
    f_required:  { en: "Enter your name and phone number.", sw: "Weka jina lako na namba ya simu." },
    f_off:       { en: "Online requests are not switched on yet. The clinic's contact channel is still to be confirmed.", sw: "Maombi ya mtandaoni bado hayajawashwa. Njia ya mawasiliano ya kliniki inasubiri uthibitisho." },
    f_opened:    { en: "Your message is ready to send. Check it and press send.", sw: "Ujumbe wako uko tayari. Uhakiki kisha bonyeza tuma." },
    f_msgHello:  { en: "Hello, I would like to request an appointment.", sw: "Habari, ningependa kuomba miadi." },
    prev_mode:   { en: "Preview mode", sw: "Hali ya onyesho" },
    prev_items:  { en: "items to confirm", sw: "vitu vya kuthibitisha" },
    prev_show:   { en: "Preview", sw: "Onyesho" },
    prev_live:   { en: "Live view", sw: "Muonekano halisi" },
    prev_list:   { en: "Checklist", sw: "Orodha" },
    prev_done:   { en: "Everything is confirmed.", sw: "Kila kitu kimethibitishwa." },
    imgNote:     { en: "Clinic photo goes here", sw: "Picha ya kliniki itawekwa hapa" },
    tag_short:   { en: "Better health. A healthier community.", sw: "Afya bora. Jamii yenye afya." }
  }
};
