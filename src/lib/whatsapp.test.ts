import { describe, expect, it } from "vitest";
import { buildTelLink, buildWhatsAppLink, fillTemplate } from "./whatsapp";

describe("buildWhatsAppLink", () => {
  it("strips +, spaces and dashes from the number", () => {
    expect(buildWhatsAppLink("+255 658-879-805")).toBe("https://wa.me/255658879805");
  });

  it("url-encodes the message, including newlines and non-ASCII text", () => {
    const link = buildWhatsAppLink("255658879805", "Habari\nJina: Amina & Juma");
    expect(link).toBe(
      "https://wa.me/255658879805?text=Habari%0AJina%3A%20Amina%20%26%20Juma",
    );
  });

  it("rejects numbers that cannot be real", () => {
    expect(() => buildWhatsAppLink("123")).toThrow();
  });
});

describe("buildTelLink", () => {
  it("keeps the leading + for international numbers", () => {
    expect(buildTelLink("+255 25 258 0073")).toBe("tel:+255252580073");
  });

  it("works for local numbers without +", () => {
    expect(buildTelLink("0658 879 805")).toBe("tel:0658879805");
  });
});

describe("fillTemplate", () => {
  it("fills placeholders and trims the values", () => {
    expect(fillTemplate("Jina: {name}, Siku: {day}", { name: "  Amina ", day: "Jumatatu" })).toBe(
      "Jina: Amina, Siku: Jumatatu",
    );
  });

  it("leaves unknown placeholders untouched", () => {
    expect(fillTemplate("Hello {who}", {})).toBe("Hello {who}");
  });
});
