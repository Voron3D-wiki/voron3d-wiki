import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The default `generateId` slugifies: it lowercases and strips dots, which
// turns /printers/2.4/ into /printers/24/ and /MMUs/ into /mmus/. Those are
// live URLs with inbound links and search rankings behind them, so the id is
// the directory path verbatim instead. `src/pages/[...slug].astro` uses it as
// the URL directly, and `scripts/check-nav.mjs` fails the build if it ever
// stops matching what src/lib/nav.mjs links to.
//
// The root `index.mdx` would reduce to an empty string, which the data store
// rejects, so it keeps the id `index`; `[...slug].astro` maps that back to `/`.
const pathAsId = ({ entry }: { entry: string }) => {
  const id = entry.replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '');
  return id === '' ? 'index' : id;
};

export const collections = {
  docs: defineCollection({
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: './src/content/docs',
      generateId: pathAsId,
    }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      /** Legacy pin from the MkDocs migration. Kept for reference; the URL now
       *  comes from the file path, which every page already matches. */
      slug: z.string().optional(),
      /** Hides the right-hand contents rail on pages that do not need it. */
      tableOfContents: z.boolean().default(true),
      /** Home and other landing pages drop the H1 + rule treatment. */
      template: z.enum(['doc', 'landing']).default('doc'),
    }),
  }),
};
