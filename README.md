# AfyaWeb

Multi-clinic healthcare website and management platform for Tanzania. Approval-based clinic registration, shared PostgreSQL with strict tenant isolation, branded clinic websites first, clinic operations later.

Pilot customer: Lupyana Polyclinic, Songwe.

## Status

Stage 0 (project foundation) has not started. The repo root is reserved for the Next.js application.

## Layout

| Path | What it is |
| --- | --- |
| `prototypes/lupyana-static/` | Static bilingual prototype of the Lupyana website. Content-driven by `config.js`, with confirmed/pending status and preview/live modes. Used as the blueprint for the website module and as the pilot demo. |
| `prototypes/lupyana-polyclinic/` | Production-quality static build of the Lupyana Polyclinic website: 8 pages, EN/SW switcher, editable `content.json`, no build step. Bricolage Grotesque + Onest typography and the supplied clinic logo. See its own `README.md` for setup, placeholder guide and Figma handoff. |
