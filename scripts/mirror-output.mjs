// Mirror dist/ to site/ after every build.
//
// Cloudflare Pages' output directory is a dashboard setting this repo cannot
// change. The project was created against MkDocs, whose output directory was
// `site`; Astro's is `dist`. Publishing both means the deploy succeeds whichever
// value the dashboard currently holds, so a preprod deploy is not blocked on
// someone editing a form.
//
// Once the Pages project is confirmed to be on `dist`, delete this script and
// the `&& node scripts/mirror-output.mjs` from the build script. It is a
// compatibility shim, not architecture.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FROM = path.join(ROOT, 'dist');
const TO = path.join(ROOT, 'site');

if (!fs.existsSync(FROM)) {
  console.error('mirror-output: dist/ does not exist — did astro build fail?');
  process.exit(1);
}

fs.rmSync(TO, { recursive: true, force: true });
fs.cpSync(FROM, TO, { recursive: true });

const count = fs.readdirSync(TO).length;
console.log(`mirror-output: dist/ -> site/ (${count} top-level entries)`);
