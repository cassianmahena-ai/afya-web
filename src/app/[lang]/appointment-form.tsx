"use client";

import { useState, type FormEvent } from "react";
import { buildWhatsAppLink, fillTemplate } from "@/lib/whatsapp";

type Props = {
  whatsappNumber: string;
  serviceNames: string[];
  labels: {
    name: string;
    phone: string;
    service: string;
    servicePlaceholder: string;
    day: string;
    dayHint: string;
    submit: string;
    privacy: string;
  };
  /** Message template in the page's language, with {name} style placeholders. */
  messageTemplate: string;
};

// No data leaves the browser except through the visitor's own WhatsApp.
export function AppointmentForm({
  whatsappNumber,
  serviceNames,
  labels,
  messageTemplate,
}: Props) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    service: "",
    day: "",
  });

  function set(field: keyof typeof values) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const link = buildWhatsAppLink(whatsappNumber, fillTemplate(messageTemplate, values));
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="appt-name">{labels.name}</label>
        <input
          id="appt-name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={set("name")}
        />
      </div>

      <div className="field">
        <label htmlFor="appt-phone">{labels.phone}</label>
        <input
          id="appt-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={values.phone}
          onChange={set("phone")}
        />
      </div>

      <div className="field">
        <label htmlFor="appt-service">{labels.service}</label>
        <select
          id="appt-service"
          name="service"
          required
          value={values.service}
          onChange={set("service")}
        >
          <option value="" disabled>
            {labels.servicePlaceholder}
          </option>
          {serviceNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="appt-day">{labels.day}</label>
        <input
          id="appt-day"
          name="day"
          placeholder={labels.dayHint}
          required
          value={values.day}
          onChange={set("day")}
        />
      </div>

      <button type="submit" className="button button--gold">
        {labels.submit}
      </button>
      <p className="form__privacy">{labels.privacy}</p>
    </form>
  );
}
