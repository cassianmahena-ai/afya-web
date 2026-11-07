import type { Locale } from "./config";

export type Dictionary = {
  languageName: string;
  switchTo: string;
  sampleBanner: string;
  hero: { title: string; lead: string };
  actions: { call: string; whatsapp: string; directions: string; ariaLabel: string };
  services: { title: string; intro: string };
  hours: { title: string; note: string };
  find: { title: string; landmarkLabel: string; phoneLabel: string };
  appointment: {
    title: string;
    intro: string;
    name: string;
    phone: string;
    service: string;
    servicePlaceholder: string;
    day: string;
    dayHint: string;
    submit: string;
    privacy: string;
    /** Template with {name}, {phone}, {service} and {day} placeholders. */
    message: string;
  };
  footer: { rights: string };
  meta: { description: string };
};

export const dictionaries: Record<Locale, Dictionary> = {
  sw: {
    languageName: "Kiswahili",
    switchTo: "English",
    sampleBanner:
      "Maudhui ya mfano. Taarifa halisi za kliniki zitawekwa hivi karibuni.",
    hero: {
      title: "Huduma bora za kibingwa za afya, hapa Ilolo.",
      lead: "Piga simu au tuma ujumbe wa WhatsApp kuuliza kuhusu huduma zetu au kuomba miadi.",
    },
    actions: {
      call: "Piga simu",
      whatsapp: "WhatsApp",
      directions: "Njia ya kufika",
      ariaLabel: "Wasiliana nasi",
    },
    services: {
      title: "Huduma zetu",
      intro: "Piga simu kuthibitisha huduma unayohitaji kabla ya kuja.",
    },
    hours: {
      title: "Saa za kazi",
      note: "Kwa huduma za dharura nje ya saa hizi, piga simu.",
    },
    find: {
      title: "Tutafute",
      landmarkLabel: "Alama ya kutambua",
      phoneLabel: "Simu",
    },
    appointment: {
      title: "Omba miadi",
      intro:
        "Jaza fomu hii. Itafungua WhatsApp ikiwa na ujumbe tayari, nawe utaituma kwetu.",
      name: "Jina lako",
      phone: "Namba yako ya simu",
      service: "Huduma",
      servicePlaceholder: "Chagua huduma",
      day: "Siku unayopendelea",
      dayHint: "Mfano: Jumatatu asubuhi",
      submit: "Tuma kwa WhatsApp",
      privacy:
        "Hatuhifadhi taarifa zako kwenye tovuti. Ujumbe unaenda moja kwa moja kupitia WhatsApp yako.",
      message:
        "Habari, naomba miadi.\nJina: {name}\nSimu: {phone}\nHuduma: {service}\nSiku ninayopendelea: {day}",
    },
    footer: { rights: "Haki zote zimehifadhiwa." },
    meta: {
      description:
        "Lupyana Polyclinic, Ilolo, Songwe. Huduma za afya, saa za kazi, mahali tulipo na kuomba miadi.",
    },
  },
  en: {
    languageName: "English",
    switchTo: "Kiswahili",
    sampleBanner:
      "Sample content. The clinic's real details will be added soon.",
    hero: {
      title: "Quality specialist healthcare, here in Ilolo.",
      lead: "Call us or message us on WhatsApp to ask about our services or request an appointment.",
    },
    actions: {
      call: "Call us",
      whatsapp: "WhatsApp",
      directions: "Get directions",
      ariaLabel: "Contact us",
    },
    services: {
      title: "Our services",
      intro: "Call to confirm the service you need before you come.",
    },
    hours: {
      title: "Opening hours",
      note: "For emergencies outside these hours, call us.",
    },
    find: {
      title: "Find us",
      landmarkLabel: "Landmark",
      phoneLabel: "Phone",
    },
    appointment: {
      title: "Request an appointment",
      intro:
        "Fill in this form. It opens WhatsApp with your message ready, and you send it to us.",
      name: "Your name",
      phone: "Your phone number",
      service: "Service",
      servicePlaceholder: "Choose a service",
      day: "Preferred day",
      dayHint: "For example: Monday morning",
      submit: "Send on WhatsApp",
      privacy:
        "We do not store your details on this website. Your message goes straight through your own WhatsApp.",
      message:
        "Hello, I would like to request an appointment.\nName: {name}\nPhone: {phone}\nService: {service}\nPreferred day: {day}",
    },
    footer: { rights: "All rights reserved." },
    meta: {
      description:
        "Lupyana Polyclinic, Ilolo, Songwe. Health services, opening hours, location and appointment requests.",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
