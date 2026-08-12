// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';
import remarkAsides from './src/plugins/remark-asides.mjs';
import rehypeLinkBadges from './src/plugins/rehype-link-badges.mjs';
import rehypeTableWrap from './src/plugins/rehype-table-wrap.mjs';
import rehypeHeadingAnchors from './src/plugins/rehype-heading-anchors.mjs';

// NOTE ON NAVIGATION
//
// The sidebar tree used to live in this file, inside the Starlight integration
// config. It is plain data in src/lib/nav.mjs now, alongside the helpers that
// read it — see the editorial stance in README.md before reordering anything.
//
// NOTE ON URLS
//
// Page URLs come from the content file's path verbatim, not from a slugifier,
// so /printers/2.4/ and /MMUs/ keep their case and their dots. See the
// `generateId` note in src/content.config.ts; `npm run check:nav` fails the
// build if nav.mjs and the content tree ever disagree.

export default defineConfig({
  site: 'https://voron3d.wiki',

  // Matches MkDocs' use_directory_urls, so /printers/v0/ stays /printers/v0/.
  trailingSlash: 'always',
  build: { format: 'directory' },

  integrations: [mdx(), sitemap()],

  markdown: {
    // `:::note` / `:::tip` / `:::caution`, carried over from Starlight so the
    // 27 pages already using that syntax did not have to be rewritten.
    remarkPlugins: [remarkDirective, remarkAsides],

    // Every outbound link gets its rel and its disclosure, every table gets a
    // scroll wrapper, every heading gets an anchor. All at build time so an
    // author cannot forget them — the affiliate marking in particular is a
    // disclosure, not decoration.
    rehypePlugins: [
      [rehypeLinkBadges, { site: 'voron3d.wiki' }],
      rehypeTableWrap,
      // Astro runs its own copy of rehypeHeadingIds *after* user plugins, so
      // without naming it here the anchors would look for ids that do not
      // exist yet and silently add nothing. Running it explicitly first is the
      // supported way to depend on the ids; Astro's later pass sees them
      // already present and leaves them alone.
      rehypeHeadingIds,
      rehypeHeadingAnchors,
    ],

    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: false,
    },
  },
});
