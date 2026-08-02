// MkDocs (Python-Markdown + pymdownx) -> Starlight (MDX) converter.
//
// Run from astro/:  npm run convert
//
// Reads ../docs and writes src/content/docs. Rerunnable — it wipes its own
// output first, so it is always a clean projection of the MkDocs tree rather
// than something you hand-edit afterwards.
//
// URLs are preserved exactly. docs/printers/v0/index.md serves at /printers/v0/
// under MkDocs, and src/content/docs/printers/v0/index.mdx serves at /printers/v0/
// under Starlight. The nav regrouping happens in astro.config.mjs (sidebar),
// not by moving files, so no URL changes and no redirects needed.
//
// Anything it cannot convert confidently is left in place and reported, so the
// output is never silently wrong.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(HERE, '../../docs');
const OUT = path.resolve(HERE, '../src/content/docs');

// Folders in docs/ that are not routable pages.
const NOT_PAGES = new Set(['tools', '_templates']);

const report = { pages: 0, assets: 0, unconverted: [] };

function flag(file, what) {
  report.unconverted.push(`${file}: ${what}`);
}

// --- frontmatter -----------------------------------------------------------

function splitFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim();
  }
  return { data, body: text.slice(m[0].length) };
}

function yamlString(s) {
  return `'${String(s).replace(/'/g, "''")}'`;
}

// --- markdown dialect ------------------------------------------------------

// Python-Markdown admonitions:  !!! tip "Title"  /  ??? info "Title"
// Starlight asides support note|tip|caution|danger only; everything else maps
// onto the closest one. `???` is collapsible in Material, which Starlight has
// no equivalent for, so those become <details> to keep the behaviour.
const ASIDE = {
  note: 'note', info: 'note', abstract: 'note', summary: 'note', tldr: 'note',
  tip: 'tip', hint: 'tip', important: 'tip', success: 'tip', check: 'tip', done: 'tip',
  question: 'note', help: 'note', faq: 'note', example: 'note', quote: 'note', cite: 'note',
  warning: 'caution', attention: 'caution', caution: 'caution',
  danger: 'danger', error: 'danger', bug: 'danger', failure: 'danger', fail: 'danger', missing: 'danger',
};

function convertAdmonitions(text, file) {
  const lines = text.split('\n');
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)(\?\?\?\+?|!!!)\s+(?:"([^"]*)"|([\w-]+))(?:\s+"([^"]*)")?\s*$/);
    if (!m) { out.push(lines[i]); continue; }

    const [, indent, marker, bareTitle, kindRaw, quotedTitle] = m;
    const kind = (kindRaw || 'note').toLowerCase();
    const title = quotedTitle ?? bareTitle ?? '';
    const collapsible = marker.startsWith('???');

    // Body is everything indented further than the marker.
    const body = [];
    let j = i + 1;
    for (; j < lines.length; j++) {
      if (lines[j].trim() === '') { body.push(''); continue; }
      if (lines[j].length - lines[j].trimStart().length <= indent.length) break;
      body.push(lines[j].slice(indent.length + 4));
    }
    while (body.length && body[body.length - 1] === '') body.pop();

    if (collapsible) {
      out.push(`${indent}<details>`);
      out.push(`${indent}<summary>${title || kind}</summary>`);
      out.push('');
      body.forEach((l) => out.push(indent + l));
      out.push('');
      out.push(`${indent}</details>`);
    } else {
      const type = ASIDE[kind] || 'note';
      if (!ASIDE[kind]) flag(file, `unknown admonition type "${kind}" -> note`);
      out.push(`${indent}:::${type}${title ? `[${title}]` : ''}`);
      body.forEach((l) => out.push(indent + l));
      out.push(`${indent}:::`);
    }
    i = j - 1;
  }
  return out.join('\n');
}

// pymdownx.tabbed:  === "Label"  ->  <Tabs><TabItem label="Label">
function convertTabs(text) {
  const lines = text.split('\n');
  const out = [];
  let open = false;
  let indent = '';

  const close = () => { if (open) { out.push(`${indent}</TabItem>`); out.push(`${indent}</Tabs>`); open = false; } };

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)===\s+"([^"]*)"\s*$/);
    if (m) {
      const nextIsTab = /^\s*===\s+"/.test(lines[i + 1] || '');
      if (!open) { indent = m[1]; out.push(`${indent}<Tabs>`); open = true; }
      else out.push(`${indent}</TabItem>`);
      out.push(`${indent}<TabItem label="${m[2]}">`);
      if (nextIsTab) { /* empty tab body */ }
      continue;
    }
    // A non-indented, non-empty line ends the tab set.
    if (open && lines[i].trim() !== '' && (lines[i].length - lines[i].trimStart().length) <= indent.length) close();
    out.push(open ? lines[i].replace(new RegExp(`^${indent}    `), `${indent}`) : lines[i]);
  }
  close();
  return out.join('\n');
}

// Material grid cards -> Starlight <CardGrid>/<Card>.
function convertGridCards(text) {
  return text.replace(
    /<div class="grid cards"[^>]*>\n([\s\S]*?)\n<\/div>/g,
    (_all, inner) => {
      const cards = inner.split(/\n(?=-\s{3})/).map((block) => {
        const b = block.replace(/^-\s{3}/, '').trim();
        const titleM = b.match(/^(?::[\w-]+:(?:\{[^}]*\})?\s*)?__([^_]+)__/);
        const title = titleM ? titleM[1].trim() : 'Untitled';
        const body = b
          .replace(/^(?::[\w-]+:(?:\{[^}]*\})?\s*)?__[^_]+__\s*/, '')
          .replace(/^\s*---\s*$/m, '')
          .split('\n').map((l) => l.replace(/^ {4}/, '')).join('\n')
          .trim();
        return `<Card title=${JSON.stringify(title)}>\n${body}\n</Card>`;
      });
      return `<CardGrid>\n${cards.join('\n\n')}\n</CardGrid>`;
    },
  );
}

// Strip Material icon shortcodes (:material-foo:{ .lg }) — Starlight has its own
// icon set and these do not carry over 1:1.
function stripIcons(text) {
  return text
    .replace(/:(?:material|fontawesome|octicons|simple)-[\w-]+:\{[^}]*\}/g, '')
    .replace(/:(?:material|fontawesome|octicons|simple)-[\w-]+:/g, '');
}

// Python-Markdown accepts "###2507" as a heading; CommonMark requires a space
// and would render it as literal text. Repair rather than silently downgrade a
// heading to a paragraph — it also keeps the page's on-page nav intact.
function fixHeadings(text, file) {
  let n = 0;
  const out = text.replace(/^(#{1,6})([^#\s].*)$/gm, (_m, hashes, rest) => {
    n++;
    return `${hashes} ${rest}`;
  });
  if (n) flag(file, `${n} heading(s) missing the space after '#' — valid in Python-Markdown, not in CommonMark; repaired`);
  return out;
}

// attr_list: strip { .md-button }, { .lg .middle }, and image sizing hints.
function stripAttrList(text) {
  return text
    .replace(/\]\(([^)]+)\)\{[^}]*\}/g, ']($1)')      // links
    .replace(/(!\[[^\]]*\]\([^)]+\))\{[^}]*\}/g, '$1') // images
    .replace(/^(#{1,6} .+?)\s*\{[^}]*\}\s*$/gm, '$1'); // headings with { #id }
}

// --- links -----------------------------------------------------------------

// docs-relative .md links -> site URLs. MkDocs directory-URL shape is preserved,
// so ../foo/index.md and foo.md both resolve to the same path they do today.
function convertLinks(text, relDir) {
  return text.replace(/\]\(([^)\s]+?)(#[^)\s]*)?\)/g, (all, target, hash = '') => {
    if (/^(https?:|mailto:|#|\/)/.test(target)) return all;
    if (!target.endsWith('.md')) return all;

    let p = path.posix.normalize(path.posix.join(relDir, target));
    p = p.replace(/\/index\.md$/, '').replace(/\.md$/, '');
    return `](/${p}/${hash})`;
  });
}

// --- HTML -> JSX -----------------------------------------------------------

// Some pages carry hand-rolled CSS-only tab widgets (`<div class="mkdocs-tabs">`
// plus a radio/label pair) whose CSS was never written, so they render as inert
// nested divs today. They are also left unclosed, which Python-Markdown tolerated
// and MDX will not. Strip the dead wrapper, keep the content, and flag the page.
function stripDeadTabWidget(text, file) {
  if (!/class="mkdocs-tabs"/.test(text)) return text;
  flag(file, 'hand-rolled .mkdocs-tabs widget had no CSS and was left unclosed — wrapper stripped, content kept; needs a real <Tabs> rewrite');
  return text
    .replace(/<div class="mkdocs-tabs">\s*/g, '')
    .replace(/<div class="mkdocs-content">\s*/g, '')
    .replace(/<input[^>]*name="tab-group"[^>]*>\s*/g, '')
    .replace(/<label for="tab-\d+">([^<]*)<\/label>\s*/g, '');
}

// Any div imbalance left after that is a genuine authoring bug the old build
// swallowed. Report it rather than emitting MDX that cannot parse.
function checkBalance(text, file) {
  const stripped = text.replace(/^```[\s\S]*?^```/gm, '');
  const opens = (stripped.match(/<div\b/g) || []).length;
  const closes = (stripped.match(/<\/div>/g) || []).length;
  if (opens !== closes) {
    flag(file, `${opens} <div> vs ${closes} </div> — auto-closed ${opens - closes}, verify the result`);
    return text + '\n' + '</div>'.repeat(Math.max(0, opens - closes)) + '\n';
  }
  return text;
}

// A bare `<` in prose is a JSX tag opener to MDX, so "(<5A)" and "length < 1
// meter" are hard parse errors. Python-Markdown passed them through happily.
// This is the single most common conversion failure on a hardware wiki, because
// specs are full of comparison operators.
//
// Code fences and inline code are left alone — MDX does not parse JSX in either.
function escapeBareAngles(text) {
  const segments = text.split(/(^```[\s\S]*?^```|`[^`\n]*`)/gm);
  return segments.map((seg, i) => {
    if (i % 2 === 1) return seg; // code fence or inline code
    // Keep `<` only where a real tag, closing tag, comment, or fragment follows.
    return seg.replace(/<(?![a-zA-Z/!>])/g, '&lt;');
  }).join('');
}

function htmlToJsx(text, file) {
  let t = text;

  // Python-Markdown's `markdown` attribute has no meaning in MDX.
  t = t.replace(/(<[a-zA-Z][^>]*?)\smarkdown(=["'][^"']*["'])?/g, '$1');

  t = t.replace(/\sclass=/g, ' className=');

  // style="a: b; c: d"  ->  style={{a: 'b', c: 'd'}}
  t = t.replace(/\sstyle="([^"]*)"/g, (_m, css) => {
    const obj = css.split(';').map((d) => d.trim()).filter(Boolean).map((d) => {
      const idx = d.indexOf(':');
      if (idx === -1) return null;
      const prop = d.slice(0, idx).trim().replace(/-([a-z])/g, (_x, c) => c.toUpperCase());
      return `${prop}: ${JSON.stringify(d.slice(idx + 1).trim())}`;
    }).filter(Boolean);
    return ` style={{${obj.join(', ')}}}`;
  });

  // Void elements must self-close in JSX.
  t = t.replace(/<(br|hr|img|input|source|col)((?:\s[^>]*?)?)\s*\/?>/g, '<$1$2 />');

  // HTML comments are not valid MDX.
  t = t.replace(/<!--([\s\S]*?)-->/g, (_m, c) => `{/*${c.replace(/\*\//g, '*\\/')}*/}`);

  // Bare {...} in prose is a JSX expression. Escape the ones we did not create.
  t = t.replace(/\{% *include *"([^"]+)" *%\}/g, (m) => m); // handled elsewhere

  if (/<(script|style)\b/i.test(t)) flag(file, 'contains inline <script>/<style> — review by hand');

  return t;
}

// --- per-file --------------------------------------------------------------

function convertPage(absPath, relPath) {
  const raw = fs.readFileSync(absPath, 'utf8');
  const { data, body: rawBody } = splitFrontmatter(raw);
  const relDir = path.posix.dirname(relPath);

  const components = new Set();
  const transclusions = []; // { name, from }
  let body = rawBody;

  // Includes -> components. These are the ads/disclosure partials; in Starlight
  // they belong in the page footer, not pasted into prose.
  body = body.replace(/\{%\s*include\s+"([^"]+)"\s*%\}/g, (_m, target) => {
    if (target.includes('affiliate-disclosure')) { components.add('AffiliateDisclosure'); return '<AffiliateDisclosure />'; }
    if (target.includes('work-in-progress')) { components.add('WorkInProgress'); return '<WorkInProgress />'; }

    // Page-to-page transclusion (BOM tables, the stepper database). Those
    // targets are real pages of their own, so MDX imports the compiled page and
    // renders it inline — same single source of truth the include gave us.
    const resolved = path.posix.normalize(path.posix.join(relDir, target));
    if (target.endsWith('.md') && fs.existsSync(path.join(SRC, resolved))) {
      const name = 'Inc' + resolved.replace(/[^a-zA-Z0-9]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\s/g, '').replace(/IndexMd$/, '');
      let from = path.posix.relative(relDir, resolved).replace(/\.md$/, '.mdx');
      if (!from.startsWith('.')) from = './' + from;
      if (!transclusions.some((t) => t.name === name)) transclusions.push({ name, from });
      return `<${name} />`;
    }

    flag(relPath, `unmapped include "${target}"`);
    return `{/* TODO unmapped include: ${target} */}`;
  });

  body = fixHeadings(body, relPath);
  body = convertAdmonitions(body, relPath);
  body = convertGridCards(body);
  body = convertTabs(body);
  body = stripIcons(body);
  body = stripAttrList(body);
  body = convertLinks(body, relDir);
  body = stripDeadTabWidget(body, relPath);
  body = escapeBareAngles(body);
  body = htmlToJsx(body, relPath);
  body = checkBalance(body, relPath);

  if (/<CardGrid>/.test(body)) { components.add('Card'); components.add('CardGrid'); }
  if (/<Tabs>/.test(body)) { components.add('Tabs'); components.add('TabItem'); }

  // Title: frontmatter wins, else first H1, else folder name.
  let title = data.title;
  if (!title) {
    const h1 = body.match(/^#\s+(.+)$/m);
    title = h1 ? h1[1].trim() : path.basename(relDir);
  }
  // Starlight renders the title itself; drop the duplicate H1.
  body = body.replace(/^#\s+.+$/m, '').trimStart();

  const starlightImports = [...components].filter((c) => ['Card', 'CardGrid', 'Tabs', 'TabItem'].includes(c));
  const localImports = [...components].filter((c) => ['AffiliateDisclosure', 'WorkInProgress'].includes(c));

  const imports = [];
  if (starlightImports.length) imports.push(`import { ${starlightImports.sort().join(', ')} } from '@astrojs/starlight/components';`);
  localImports.sort().forEach((c) => imports.push(`import ${c} from '~/components/${c}.astro';`));
  transclusions.forEach((t) => imports.push(`import ${t.name} from '${t.from}';`));

  const fm = [`title: ${yamlString(title)}`];
  if (data.description) fm.push(`description: ${yamlString(data.description.replace(/^["']|["']$/g, ''))}`);

  // Starlight slugifies paths — it lowercases and drops dots, which would turn
  // /printers/2.4/ into /printers/24/ and /MMUs/ into /mmus/. That is 21 live
  // URLs on this site. Pin the slug to the MkDocs path so every URL is
  // byte-identical after the move and no redirects are needed.
  const mkdocsPath = relPath.replace(/\/index\.md$/, '').replace(/\.md$/, '');
  if (mkdocsPath !== 'index') fm.push(`slug: ${yamlString(mkdocsPath)}`);

  const out = `---\n${fm.join('\n')}\n---\n${imports.length ? `\n${imports.join('\n')}\n` : ''}\n${body.trim()}\n`;

  const outPath = path.join(OUT, relPath.replace(/\.md$/, '.mdx'));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out);
  report.pages++;
}

function walk(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const relPath = rel ? path.posix.join(rel, entry.name) : entry.name;

    if (entry.isDirectory()) {
      if (NOT_PAGES.has(entry.name)) continue;
      walk(abs, relPath);
      continue;
    }

    if (entry.name.endsWith('.md')) {
      convertPage(abs, relPath);
    } else {
      // Images and data files ride along beside their page, same as MkDocs.
      const outPath = path.join(OUT, relPath);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.copyFileSync(abs, outPath);
      report.assets++;
    }
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
walk(SRC);

// Keep the event-tracking script in sync rather than holding a second copy that
// can drift from the production one.
const ANALYTICS_SRC = path.join(SRC, 'javascripts/analytics.js');
if (fs.existsSync(ANALYTICS_SRC)) {
  const dest = path.resolve(HERE, '../public/js/analytics.js');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(ANALYTICS_SRC, dest);
  console.log('synced analytics.js from docs/javascripts/');
}

console.log(`\nconverted ${report.pages} pages, copied ${report.assets} assets`);
if (report.unconverted.length) {
  console.log(`\n${report.unconverted.length} thing(s) need a human:\n`);
  for (const line of report.unconverted) console.log(`  - ${line}`);
} else {
  console.log('nothing flagged for review');
}
