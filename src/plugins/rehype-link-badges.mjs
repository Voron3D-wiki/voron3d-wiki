// Annotate outbound links with a badge saying where they go.
//
// This replaces the "External Link Design Language" that lived in the MkDocs
// extra.css as a pile of `a[href*="..."]::after { content: "Affiliate Link" }`
// rules. Doing it at build time instead of in CSS buys three things that
// mattered and the CSS version could not do:
//
//   1. Real icons, and a badge that wraps as one unit instead of a bare string
//      glued to the end of the link text.
//   2. Screen-reader text, so the marking is not purely visual.
//   3. `rel` attributes. Affiliate links get rel="sponsored", which is what
//      Google asks for on paid links — relevant given the AliExpress penalty
//      this site was already chasing in c53bee2.
//
// Marking is automatic and derived from the href. That is deliberate: the
// affiliate badge is a disclosure, and a disclosure an author has to remember
// to add is one that eventually goes missing.
//
// WHAT CHANGED, AND HOW TO CHANGE IT BACK
//
// Every kind used to render a coloured pill with a word in it — "GitHub",
// "OEM", "community". On link-dense pages that put three or four coloured
// chips in a single paragraph, which is most of what read as noisy body text.
//
// Only `affiliate` keeps a visible marker now, because only that one is a
// disclosure; the rest are conveniences. Their destination is still announced
// to screen readers, still carries the right `rel`, and still opens in a new
// tab. To bring the visible labels back, flip `VISIBLE_LABEL` below — the
// styling for both states already exists in src/styles/content.css.

import { visit } from 'unist-util-visit';
import { classify, relFor, LABELS, ICONS } from '../lib/link-kind.mjs';

/** Which kinds render their label as visible text, rather than icon + sr-only. */
const VISIBLE_LABEL = new Set([]);

function icon(kind) {
  // Without a visible label there is nothing for a GitHub or Discord glyph to
  // caption, and a paragraph sprinkled with brand marks is the noise this was
  // meant to remove. Everything but affiliate falls back to the one neutral
  // "leaves the site" arrow.
  const glyph = kind === 'affiliate' ? 'affiliate' : 'external';

  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: ['link-badge__icon'],
      viewBox: '0 0 24 24',
      width: 12,
      height: 12,
      'aria-hidden': 'true',
      focusable: 'false',
      fill: 'currentColor',
    },
    children: [{ type: 'element', tagName: 'path', properties: { d: ICONS[glyph] }, children: [] }],
  };
}

function badge(kind) {
  const { text, sr } = LABELS[kind];
  const children = [icon(kind)];

  if (text && VISIBLE_LABEL.has(kind)) {
    children.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['link-badge__text'] },
      children: [{ type: 'text', value: text }],
    });
  }

  // Visually-hidden description so the marking is not purely visual.
  children.push({
    type: 'element',
    tagName: 'span',
    properties: { className: ['sr-only'] },
    children: [{ type: 'text', value: ` (${sr})` }],
  });

  return {
    type: 'element',
    tagName: 'span',
    properties: { className: ['link-badge', `link-badge--${kind}`] },
    children,
  };
}

export default function rehypeLinkBadges({ site = 'voron3d.wiki' } = {}) {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;

      const href = node.properties?.href;
      if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return;

      let hostname;
      try {
        hostname = new URL(href).hostname.replace(/^www\./, '');
      } catch {
        return;
      }
      if (hostname === site || hostname.endsWith('.' + site)) return;

      // Images and buttons carry their own affordance; a badge inside them
      // just looks broken.
      const classes = node.properties.className || [];
      if (classes.includes('md-button') || classes.includes('wiki-button')) return;
      if (node.children.some((c) => c.type === 'element' && c.tagName === 'img')) return;

      const kind = classify(hostname);

      node.properties.className = [...classes, 'ext-link', `ext-link--${kind}`];
      node.properties.target = '_blank';
      node.properties.rel = relFor(kind);

      node.children.push(badge(kind));
    });
  };
}
