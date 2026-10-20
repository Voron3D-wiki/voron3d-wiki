// Fail the build if the navigation and the content tree disagree.
//
// Page URLs come from file paths and the sidebar comes from a hand-written tree
// in src/lib/nav.mjs. Those are two sources for one fact, which is exactly the
// arrangement that rots: a page gets renamed and the sidebar keeps a dead link,
// or a page is added and never appears in the nav at all.
//
// Under Starlight a bad `link:` was a silent 404 in the sidebar. This turns
// both directions into a build failure.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allLinks } from '../src/lib/nav.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'src', 'content', 'docs');

/** Every page URL the content tree will produce. */
function pageUrls(dir = DOCS, prefix = '') {
  const urls = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      urls.push(...pageUrls(full, `${prefix}${entry.name}/`));
    } else if (/\.mdx?$/.test(entry.name)) {
      const base = entry.name.replace(/\.mdx?$/, '');
      urls.push(base === 'index' ? `/${prefix}` : `/${prefix}${base}/`);
    }
  }
  return urls;
}

const pages = new Set(pageUrls());
const linked = new Set(allLinks().map((link) => link.href));

// Pages that are deliberately reachable without a sidebar entry.
const UNLISTED = new Set([
  '/',
  '/policies/',

  // Detail pages reached from a parent's prose rather than from the nav. That
  // is a reasonable shape for these — they are alternatives mentioned in a
  // comparison, not destinations in their own right.
  '/printers/DoomCube/duelingZero/',
  '/printers/Printers-for-ants/',
  '/printhead/afterburner/',
]);

// Pages with no nav entry AND no inbound link from any other page: they build
// and deploy, but nothing on the site leads to them.
//
// This predates the layout rewrite — the Starlight sidebar did not list them
// either, it just had no way to say so. They are listed rather than deleted
// because whether each one should be linked up, merged, or dropped is an
// editorial call, not a build-tooling one.
const UNREACHABLE = new Set([
  '/printers/commercial/',
  '/printhead/cooling/',
  '/printhead/hotends/chcXL/',
  '/printhead/mini-afterburner/',
]);

const dead = [...linked].filter((href) => !pages.has(href));
const orphans = [...pages].filter(
  (href) => !linked.has(href) && !UNLISTED.has(href) && !UNREACHABLE.has(href)
);
// A page that gets linked up should come off the list, or the list stops
// meaning anything.
const stale = [...UNREACHABLE].filter((href) => linked.has(href) || !pages.has(href));

if (dead.length > 0) {
  console.error('\ncheck-nav: navigation links with no page behind them:');
  for (const href of dead.sort()) console.error(`  ${href}`);
}

if (orphans.length > 0) {
  console.error('\ncheck-nav: pages missing from the navigation:');
  for (const href of orphans.sort()) console.error(`  ${href}`);
  console.error('\n  Add them to src/lib/nav.mjs, or to UNLISTED in this script.');
}

if (stale.length > 0) {
  console.error('\ncheck-nav: entries in UNREACHABLE that are no longer unreachable:');
  for (const href of stale.sort()) console.error(`  ${href}`);
  console.error('\n  Remove them from the list in this script.');
}

if (dead.length > 0 || orphans.length > 0 || stale.length > 0) {
  console.error('');
  process.exit(1);
}

console.log(`check-nav: ${pages.size} pages, ${linked.size} nav links, all matched.`);
if (UNREACHABLE.size > 0) {
  console.log(
    `check-nav: ${UNREACHABLE.size} page(s) still have no route in — see UNREACHABLE in scripts/check-nav.mjs.`
  );
}
