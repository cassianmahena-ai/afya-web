import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type Service = {
  id: string;
  name: Localized;
  description: Localized;
};

export type HoursRow = { days: Localized; hours: Localized };

export type Clinic = {
  id: string;
  slug: string;
  name: string;
  /** True while the content below is sample content, not confirmed by the clinic. */
  isPlaceholder: boolean;
  logoUrl: string | null;
  phone: string;
  whatsapp: string;
  address: {
    locality: string;
    region: string;
    country: string;
    countryCode: string;
    landmark: Localized;
  };
  services: Service[];
  hours: HoursRow[];
};

/**
 * Seed data for the pilot clinic.
 *
 * Phone numbers, locality and landmark come from the clinic's public Instagram
 * bio and still need the owner's confirmation. Services and opening hours are
 * SAMPLE content until the clinic sends the real lists.
 *
 * Later this moves to the database (clinics, clinic_profiles, services) and
 * getClinic() becomes a query scoped by the hostname-to-clinic mapping.
 */
const lupyana: Clinic = {
  id: "00000000-0000-4000-8000-000000000001",
  slug: "lupyana",
  name: "Lupyana Polyclinic",
  isPlaceholder: true,
  logoUrl: null,
  phone: "+255252580073",
  whatsapp: "+255658879805",
  address: {
    locality: "Ilolo, Songwe",
    region: "Songwe",
    country: "Tanzania",
    countryCode: "TZ",
    landmark: {
      sw: "Mtaa wa Florida, jirani na Kanisa la Mungu Baba",
      en: "Florida street, near Kanisa la Mungu Baba (church)",
    },
  },
  services: [
    {
      id: "mother-child",
      name: { sw: "Mama na mtoto", en: "Mother and child care" },
      description: {
        sw: "Huduma kwa wajawazito, akina mama baada ya kujifungua na watoto.",
        en: "Care for pregnant women, new mothers and children.",
      },
    },
    {
      id: "outpatient",
      name: { sw: "Wagonjwa wa nje", en: "Outpatient care" },
      description: {
        sw: "Uchunguzi na matibabu ya kila siku bila kulazwa.",
        en: "Everyday check-ups and treatment without an overnight stay.",
      },
    },
    {
      id: "laboratory",
      name: { sw: "Maabara", en: "Laboratory" },
      description: {
        sw: "Vipimo vya damu na vingine, na majibu kwa daktari.",
        en: "Blood and other tests, with results shared with your doctor.",
      },
    },
    {
      id: "pharmacy",
      name: { sw: "Famasia", en: "Pharmacy" },
      description: {
        sw: "Dawa kwa maelekezo ya daktari.",
        en: "Medicines dispensed on your doctor's prescription.",
      },
    },
    {
      id: "specialist",
      name: { sw: "Ushauri wa kibingwa", en: "Specialist consultations" },
      description: {
        sw: "Kuonana na daktari bingwa kwa miadi.",
        en: "See a specialist doctor by appointment.",
      },
    },
  ],
  hours: [
    {
      days: { sw: "Jumatatu hadi Ijumaa", en: "Monday to Friday" },
      hours: { sw: "2:00 asubuhi hadi 11:00 jioni", en: "8:00 am to 5:00 pm" },
    },
    {
      days: { sw: "Jumamosi", en: "Saturday" },
      hours: { sw: "2:00 asubuhi hadi 7:00 mchana", en: "8:00 am to 1:00 pm" },
    },
    {
      days: { sw: "Jumapili", en: "Sunday" },
      hours: { sw: "Piga simu kuthibitisha", en: "Call to confirm" },
    },
  ],
};

const clinics: Record<string, Clinic> = { [lupyana.slug]: lupyana };

export function getClinic(slug: string): Clinic | undefined {
  return clinics[slug];
}

/** Single-clinic default until hostname-to-clinic mapping exists. */
export const DEFAULT_CLINIC_SLUG = "lupyana";
