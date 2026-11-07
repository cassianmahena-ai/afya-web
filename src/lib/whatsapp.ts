/**
 * Builds a click-to-chat link. The number is reduced to digits only because
 * wa.me rejects "+", spaces and dashes.
 */
export function buildWhatsAppLink(number: string, text?: string): string {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 8) {
    throw new Error("WhatsApp number looks too short");
  }
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** tel: links also want digits, but keep a leading "+" for international numbers. */
export function buildTelLink(number: string): string {
  const trimmed = number.trim();
  const digits = trimmed.replace(/\D/g, "");
  return `tel:${trimmed.startsWith("+") ? "+" : ""}${digits}`;
}

/** Replaces {key} placeholders with values. Unknown placeholders are left as they are. */
export function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? values[key].trim() : match,
  );
}
