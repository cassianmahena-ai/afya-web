import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "../globals.css";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DEFAULT_CLINIC_SLUG, getClinic } from "@/lib/clinic";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const clinic = getClinic(DEFAULT_CLINIC_SLUG);
  const dict = getDictionary(lang);

  return {
    title: clinic?.name ?? "AfyaWeb",
    description: dict.meta.description,
    alternates: {
      languages: { sw: "/sw", en: "/en" },
    },
    // Sample content must not be indexed by search engines.
    robots: clinic?.isPlaceholder ? { index: false, follow: false } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#1f3a24",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
