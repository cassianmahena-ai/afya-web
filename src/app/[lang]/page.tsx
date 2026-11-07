import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, otherLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { DEFAULT_CLINIC_SLUG, getClinic, type Clinic } from "@/lib/clinic";
import { buildTelLink, buildWhatsAppLink } from "@/lib/whatsapp";
import { AppointmentForm } from "./appointment-form";

function directionsUrl(clinic: Clinic) {
  const query = `${clinic.name} ${clinic.address.locality}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const clinic = getClinic(DEFAULT_CLINIC_SLUG);
  if (!clinic) notFound();

  const dict = getDictionary(lang);
  const other = otherLocale(lang);
  const telHref = buildTelLink(clinic.phone);
  const whatsappHref = buildWhatsAppLink(clinic.whatsapp);
  const mapsHref = directionsUrl(clinic);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    telephone: clinic.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: clinic.address.locality,
      addressRegion: clinic.address.region,
      addressCountry: clinic.address.countryCode,
    },
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {lang === "sw" ? "Ruka hadi maudhui" : "Skip to content"}
      </a>

      {clinic.isPlaceholder && <p className="sample-banner">{dict.sampleBanner}</p>}

      <div className="top">
        <header className="header container">
          <p className="wordmark">{clinic.name}</p>
          <Link
            className="lang-switch"
            href={`/${other}`}
            hrefLang={other}
            lang={other}
          >
            {dict.switchTo}
          </Link>
        </header>

        <section className="hero container" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero__title">
            {dict.hero.title}
          </h1>
          <p className="hero__lead">{dict.hero.lead}</p>

          {/* Shown from tablet width up. On phones the fixed bar below does this job. */}
          <div className="hero__actions">
            <a className="button button--gold" href={telHref}>
              {dict.actions.call}
            </a>
            <a
              className="button button--outline"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.actions.whatsapp}
            </a>
            <a
              className="hero__directions"
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.actions.directions}
            </a>
          </div>
        </section>
      </div>

      <main id="main">
        <section className="section container" id="services" aria-labelledby="services-title">
          <h2 id="services-title" className="section__title">
            {dict.services.title}
          </h2>
          <p className="section__intro">{dict.services.intro}</p>
          <ul className="services">
            {clinic.services.map((service) => (
              <li key={service.id} className="services__item">
                <h3 className="services__name">{service.name[lang]}</h3>
                <p className="services__text">{service.description[lang]}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="section section--tint">
          <div className="container info">
            <section id="hours" aria-labelledby="hours-title">
              <h2 id="hours-title" className="section__title">
                {dict.hours.title}
              </h2>
              <dl className="hours">
                {clinic.hours.map((row) => (
                  <div className="hours__row" key={row.days.en}>
                    <dt>{row.days[lang]}</dt>
                    <dd>{row.hours[lang]}</dd>
                  </div>
                ))}
              </dl>
              <p className="note">{dict.hours.note}</p>
            </section>

            <section id="find" aria-labelledby="find-title">
              <h2 id="find-title" className="section__title">
                {dict.find.title}
              </h2>
              <address className="address">
                <p className="address__place">{clinic.address.locality}</p>
                <p>
                  <span className="address__label">{dict.find.landmarkLabel}:</span>{" "}
                  {clinic.address.landmark[lang]}
                </p>
                <p>
                  <span className="address__label">{dict.find.phoneLabel}:</span>{" "}
                  <a className="text-link" href={telHref}>
                    {clinic.phone}
                  </a>
                </p>
              </address>
              <a
                className="button button--moss"
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.actions.directions}
              </a>
            </section>
          </div>
        </div>

        <section
          className="section container"
          id="appointment"
          aria-labelledby="appointment-title"
        >
          <h2 id="appointment-title" className="section__title">
            {dict.appointment.title}
          </h2>
          <p className="section__intro">{dict.appointment.intro}</p>
          <AppointmentForm
            whatsappNumber={clinic.whatsapp}
            serviceNames={clinic.services.map((s) => s.name[lang])}
            messageTemplate={dict.appointment.message}
            labels={{
              name: dict.appointment.name,
              phone: dict.appointment.phone,
              service: dict.appointment.service,
              servicePlaceholder: dict.appointment.servicePlaceholder,
              day: dict.appointment.day,
              dayHint: dict.appointment.dayHint,
              submit: dict.appointment.submit,
              privacy: dict.appointment.privacy,
            }}
          />
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            © {clinic.name}. {dict.footer.rights}
          </p>
        </div>
      </footer>

      <nav className="action-bar" aria-label={dict.actions.ariaLabel}>
        <a className="button button--gold" href={telHref}>
          {dict.actions.call}
        </a>
        <a
          className="button button--pale"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {dict.actions.whatsapp}
        </a>
        <a
          className="button button--outline"
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {dict.actions.directions}
        </a>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
