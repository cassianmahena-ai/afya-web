/**
 * Sync content.json -> assets/js/content-data.js
 * and fill missing Swahili strings with clearly marked [SW: ...] placeholders.
 *
 * Run after editing content.json:
 *   npm run sync
 */
import fs from "node:fs";
import {
  contentPath,
  dataPath,
  readContent,
  fillSwahili,
  serializeContent,
  serializeData,
} from "./content-lib.mjs";

const data = fillSwahili(readContent());

fs.writeFileSync(contentPath, serializeContent(data), "utf8");
fs.writeFileSync(dataPath, serializeData(data), "utf8");

console.log(
  `Synced content.json -> assets/js/content-data.js (${Object.keys(data.en).length} UI strings, ${data.services.length} services).`
);
