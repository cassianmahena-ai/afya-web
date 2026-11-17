/**
 * Read-only content check. Writes nothing.
 *
 *   npm run check
 *
 * Errors (exit code 1):
 *   - content.json and assets/js/content-data.js are out of sync
 *   - an image referenced in content.json does not exist
 *   - an English UI string has no Swahili counterpart
 * Warnings (exit code 0):
 *   - [SW: ...] machine placeholders still present
 *   - enquiry endpoint not configured
 *   - the public email is empty
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import {
  root,
  dataPath,
  readContent,
  fillSwahili,
  LIST_NAMES,
} from "./content-lib.mjs";

const errors = [];
const warnings = [];
const raw = readContent();

// 1. Mirror in sync? Compare the parsed objects, so formatting differences do not matter.
const expected = fillSwahili(structuredClone(raw));
let mirror = null;
try {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(dataPath, "utf8"), sandbox);
  mirror = sandbox.window.__LUPYANA_CONTENT__;
} catch (err) {
  errors.push(`assets/js/content-data.js could not be read: ${err.message}`);
}
if (mirror) {
  if (JSON.stringify(mirror) !== JSON.stringify(expected)) {
    errors.push("content-data.js is out of sync with content.json. Run: npm run sync");
  }
  if (JSON.stringify(raw) !== JSON.stringify(expected)) {
    errors.push("content.json has missing Swahili keys that sync would fill. Run: npm run sync");
  }
}

// 2. Swahili coverage and placeholders.
const missingSw = Object.keys(raw.en || {}).filter((k) => !raw.sw?.[k]);
if (missingSw.length) errors.push(`${missingSw.length} UI string(s) have no Swahili: ${missingSw.slice(0, 5).join(", ")}…`);
const extraSw = Object.keys(raw.sw || {}).filter((k) => !(k in (raw.en || {})));
if (extraSw.length) warnings.push(`${extraSw.length} Swahili key(s) have no English source: ${extraSw.slice(0, 5).join(", ")}`);

let placeholders = 0;
(function walk(v) {
  if (typeof v === "string") {
    if (v.startsWith("[SW:")) placeholders++;
  } else if (v && typeof v === "object") {
    Object.values(v).forEach(walk);
  }
})(raw.sw);
for (const name of LIST_NAMES) {
  (function walk(v) {
    if (v && typeof v === "object") {
      if (typeof v.sw === "string" && v.sw.startsWith("[SW:")) placeholders++;
      Object.values(v).forEach(walk);
    }
  })(raw[name]);
}
if (placeholders) warnings.push(`${placeholders} Swahili placeholder(s) ([SW: ...]) still need a real translation.`);

// 3. Referenced files exist.
const refs = new Set(JSON.stringify(raw).match(/assets\/img\/[A-Za-z0-9_\/.\-]+\.(?:jpg|jpeg|png|webp|svg)/g) || []);
const missing = [...refs].filter((p) => !fs.existsSync(path.join(root, p)));
if (missing.length) errors.push(`Missing image file(s):\n  ${missing.join("\n  ")}`);

// 4. Launch-readiness warnings.
if (!raw.site?.enquiryEndpoint) warnings.push("site.enquiryEndpoint is empty: the form falls back to WhatsApp.");
if (!raw.clinic?.email) warnings.push("clinic.email is empty: email rows stay hidden.");

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(errors.length ? `\nFAILED: ${errors.length} error(s).` : `\nOK: content is consistent (${warnings.length} warning(s)).`);
process.exit(errors.length ? 1 : 0);
