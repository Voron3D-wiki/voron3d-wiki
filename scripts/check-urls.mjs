// Fail the build if any live URL appears, disappears, or changes.
//
// This replaces the "verify every page pins a slug" step in build-checks.yml.
// That check made sense while Starlight owned routing: a missing `slug:` meant
// Starlight's slugifier turned /printers/2.4/ into /printers/24/. URLs now come
// from the content file's path verbatim, so there is no slugifier to defend
// against — but the thing the check was protecting is unchanged and still the
// highest-stakes invariant in the repo. 21 of these URLs have inbound links and
// search rankings behind them, and the affiliate revenue follows the rankings.
//
// So: compare the built URL set against a committed manifest. Renaming a
// directory, adding a page, or deleting one all fail loudly, and the fix is
// either to undo it or to re-record the manifest deliberately:
//
//   npm run urls:update
//
// Re-recording is a reviewable diff in a PR, which is the point — a URL change
// should be a decision someone made, not a side effect someone missed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const MANIFEST = path.join(ROOT, 'urls.txt');

const UPDATE = process.argv.includes('--update');

if (!fs.existsSync(DIST)) {
  console.error('check-urls: dist/ does not exist — run the build first.');
  process.exit(1);
}

/** Every page URL in the built output. */
function builtUrls(dir = DIST, prefix = '/') {
  const urls = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      // Build artefacts, not pages.
      if (entry.name === '_astro' || entry.name === 'pagefind') continue;
      urls.push(...builtUrls(path.join(dir, entry.name), `${prefix}${entry.name}/`));
    } else if (entry.name === 'index.html') {
      urls.push(prefix);
    }
  }
  return urls;
}

const built = builtUrls().sort();

if (UPDATE) {
  fs.writeFileSync(MANIFEST, built.join('\n') + '\n', 'utf8');
  console.log(`check-urls: recorded ${built.length} URLs to urls.txt.`);
  process.exit(0);
}

if (!fs.existsSync(MANIFEST)) {
  console.error('check-urls: urls.txt is missing. Create it with `npm run urls:update`.');
  process.exit(1);
}

const expected = fs
  .readFileSync(MANIFEST, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

const builtSet = new Set(built);
const expectedSet = new Set(expected);

const removed = expected.filter((url) => !builtSet.has(url));
const added = built.filter((url) => !expectedSet.has(url));

if (removed.length > 0) {
  console.error('\ncheck-urls: URLs that used to exist and no longer do:');
  for (const url of removed) console.error(`  ${url}`);
  console.error('\n  Each of these is a live page that would start 404ing.');
}

if (added.length > 0) {
  console.error('\ncheck-urls: URLs that are new:');
  for (const url of added) console.error(`  ${url}`);
}

if (removed.length > 0 || added.length > 0) {
  console.error('\n  If this change is intended, run `npm run urls:update` and commit urls.txt.\n');
  process.exit(1);
}

console.log(`check-urls: ${built.length} URLs, unchanged.`);
