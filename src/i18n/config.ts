export const locales = ["sw", "en"] as const;
export type Locale = (typeof locales)[number];

// Kiswahili first: it is the language most patients will read.
export const defaultLocale: Locale = "sw";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "sw" ? "en" : "sw";
}
