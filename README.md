# Voron3D Wiki

A community documentation site for Voron 3D printers — live at **[voron3d.wiki](https://voron3d.wiki)**.

Not affiliated with Voron Design. This is an independent community project that
has been maintained for several years.

---

## Start here

**If you are a person or an AI agent picking this project up, read these three
things before changing anything:**

1. **[Editorial stance](#editorial-stance)** below — the single most important
   constraint on this repo. Getting it wrong damages the site's credibility even
   when the code is correct.
2. **[AUDIT.md](AUDIT.md)** — the invariants. Things that take the site down,
   break the build, or reopen a security hole if broken. Each has a check you can
   run.
3. **[TODO](#todo)** below — what is actually in flight.

---

## What this project is

A guide to Voron 3D printers and the ecosystem around them: build guides,
component selection, configuration help, and troubleshooting.

It is **a guide first**. The site explains *why* a part matters and *how to
choose one* before it ever names a product. That ordering is what makes it worth
reading rather than a storefront, and it is deliberate.

### Funding

The site is funded by affiliate links. They pay for hosting and upkeep, they are
not going away, and they are disclosed on every page that carries them.

They are also **not** what the site is for. The editorial stance below is how
those two facts stay compatible.

### Editorial stance

> Explanation comes before recommendation. Always.

Every component section follows the same order:

```
concept   ->  why does this part matter
criteria  ->  how do I choose one
options   ->  what exists
reviews   ->  how did they actually hold up
buy       ->  where to get it
```

`src/content/docs/electronics/fans/index.mdx` is the reference implementation — it opens with
"How to choose a fan" and attaches no affiliate link to the reasoning. A reader
must be able to read the whole criteria layer and leave without ever seeing a
product link.

Concretely, this means:

- **A buy link is a page footer, never a hero.** Purchase blocks go at the
  bottom, after installation, configuration, and maintenance.
- **The affiliate disclosure ships with the buy link**, not somewhere else.
- **Negative findings get published.** The willingness to say "don't buy this"
  is what makes every other recommendation credible.
- **Gaps stay visible.** "We haven't tested this" is a legitimate and useful
  sentence.
- **Reviews attach to the component page they're about.** There is deliberately
  no top-level "Reviews" section — that reads as a product vertical.

If a change makes the site read more like a shop and less like a guide, it is
the wrong change regardless of how much sense it makes commercially.

---

## Repository layout

```
voron3d-wiki/
├── src/
│   ├── content/docs/      # All content. 75 pages of MDX.
│   ├── components/        # Shared blocks (AffiliateDisclosure, WorkInProgress)
│   ├── assets/            # Logo and site-wide images
│   └── styles/            # custom.css
├── public/                # Served as-is: favicon, js/ (analytics, sorting, links)
├── .github/               # CI: build checks, affiliate link gating
├── astro.config.mjs       # Site config, sidebar, GA4
├── AUDIT.md               # Invariants + current state. Read before merging.
└── package.json
```

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npx astro check  # type-checks content against the schema; CI runs this
```

Built with **Astro + Starlight**. Deploys to Cloudflare Pages, which builds from
git — nothing in `.github/` deploys.

**Target Pages configuration:**

| | |
|:--|:--|
| Build command | `npm ci && npm run build` |
| Output directory | `dist` |
| Node version | 22 (also pinned in `.node-version`) |

### Deploy compatibility shim — temporary

Pages holds its build command and output directory in the dashboard, which this
repo cannot change. The project was created against MkDocs. Until the settings
above are applied, two shims keep deploys working under the **old**
configuration (`pip install -r requirements.txt && mkdocs build`, output `site`):

- `scripts/mirror-output.mjs` copies `dist/` to `site/` after every build, so
  either output directory publishes a complete site.
- `tools/mkdocs-compat/` is a pip package whose only job is to put a `mkdocs`
  executable on PATH that runs `npm ci && npm run build`. `requirements.txt`
  exists solely to install it.

Both paths are tested and produce byte-identical output. **Remove them once the
dashboard is updated** — see the TODO. They are a bridge, not architecture.

> Migrated from MkDocs Material in August 2026. Every URL was preserved — see
> [Page conventions](#page-conventions) for the one rule that keeps it that way.

---

## Page conventions

**Every content page is `<name>/index.mdx`, with its images in that same folder.**
One topic, one folder.

```
src/content/docs/printhead/toolhead-boards/mks-thr/
├── index.mdx
├── MKS-UTC-conf.png
└── MKS-THR-36-42-conf.png
```

To add a page:

1. `mkdir src/content/docs/<section>/<page-name>/`
2. Create `index.mdx` with `title`, `description`, and a **`slug`**
3. Put images in the same folder, reference them by bare filename
4. Add it to the `sidebar` in `astro.config.mjs`
5. `npx astro check && npm run build`

### The slug rule

**Every page must pin an explicit `slug` matching its URL path.** CI fails
without one.

```yaml
---
title: 'Part Cooling'
description: 'Guide to part cooling options for Voron printers'
slug: 'electronics/fans'
---
```

Starlight slugifies by default — lowercasing and dropping dots. Left alone it
would turn `/printers/2.4/` into `/printers/24/` and `/MMUs/` into `/mmus/`.
That is 21 live URLs, every inbound link from Discord and the forums, and the
search rankings attached to them. The pinned slugs are the only reason the
migration changed no URLs. Do not remove them.

### Shared blocks

Reusable pieces are components in `src/components/`, imported where needed:

```mdx
import AffiliateDisclosure from '~/components/AffiliateDisclosure.astro';

...page content...

<AffiliateDisclosure />
```

The disclosure goes at the **bottom**, with the buy links it is disclosing.

### MDX is stricter than the old Markdown

Content is MDX — CommonMark plus JSX. Three things that used to be legal now
break the build:

- **A bare `<` opens a tag.** `(<5A)` and `length < 1 meter` are parse errors.
  Write `&lt;` or wrap in backticks. This is the most common one here, because
  specs are full of comparison operators.
- **Headings need a space after the hashes.** `###2507` is literal text now.
- **HTML must be valid JSX** — `className=`, `style={{...}}`, `<br />`.

The upside is that these fail loudly at build time instead of rendering wrong in
production, which is how the duplicate-content bug in `BTT-EBB-Gen1` was found.

---

## Analytics

GA4 property **G-7E70MV2KN4**, configured in exactly one place: the `head` block
in `astro.config.mjs`.

**`url_passthrough` and `linker` must stay off.** They decorate outbound URLs
with `_gl=` params, which breaks affiliate attribution. That was diagnosed in
`c53bee2` and is why the GA config is hand-rolled rather than using an
integration. Do not add a second `gtag('config', ...)` anywhere — it
double-counts every page view.

Custom events live in `public/js/analytics.js`. Two other scripts ship
alongside it: `external-links.js` (external links open in a new tab) and
`tablesort.js` (click-to-sort table headers, rewritten to drop the CDN
dependency the MkDocs version had).

| Event | What it answers |
|:--|:--|
| `affiliate_click` | Which vendor, product, placement, and page section earned the click |
| `search_no_results` | What readers looked for and we haven't written |
| `outbound_reference` | Where we hand traffic away |
| `copy_config` | Which configs people actually take |

`placement` is the one that matters most — it shows whether people buy after
reading the guide or straight off a card, which is how the editorial stance gets
checked against reality rather than assumed.

---

## TODO

Running list. Keep it current — add what you find, tick what you finish.

### Analytics — blocked on account access

- [ ] **Register custom dimensions in GA4.** Admin → Custom definitions →
      event-scoped, for `vendor`, `product`, `placement`, `page_section`,
      `destination`. Until this is done the events arrive but their parameters are
      invisible in reports. Silent failure.
- [ ] **Verify affiliate clicks land clean** in the West3D / OneTwo3D / AliExpress
      dashboards, then compare against GA's `affiliate_click` count. The gap is
      the ad-blocker loss (expect 25–40% on this audience).
- [ ] **Retire the `preventDefault()` guard** in `public/js/analytics.js` once the above
      confirms URLs are no longer being decorated. It is a workaround; the
      `url_passthrough: false` config is the actual fix.
- [ ] Consider routing affiliate links through `/go/<slug>` with a `_redirects`
      map — changes vendor URLs in one place instead of 54 files, and enables
      server-side click logging that ad blockers cannot suppress.

### Content bugs

- [ ] **`BTT-EBB-Gen1` has duplicate content.** The same flashing instructions
      appear twice (~130 lines). The second copy was wrapped in a hand-rolled
      tab widget whose CSS was never written; the migration stripped the dead
      wrapper but deliberately kept both copies, because picking one is an
      editorial call. Pick one, or convert to real `<Tabs>`.
- [x] ~~17 malformed headings in `electronics/fans`~~ — repaired during the
      migration. Noted because the same mistake now fails visibly instead of
      silently rendering.
- [ ] **Non-Voron printers are buried.** ~285 lines covering Siboor Enderwire,
      Sovol SV08 and others sit at the bottom of `docs/printers/index.md`,
      invisible to navigation. This is monetized content nobody can find. Promote
      it to its own section.
- [ ] **`guides/` is one page of outbound links** to Ellis's tuning guide,
      occupying a top-level nav slot and sending traffic away. Either build it out
      or fold it into Software.

### Reviews programme — not started

- [ ] **Write the methodology page first, before any review.** How we test, what
      we measure, what equipment, how the unit was obtained. Every review links to
      it. This page is most of what separates a review site from a shill site, and
      it is very hard to add credibly after the fact.
- [ ] Define a standard test bed — one printer, stated filament, stated slicer
      config — so numbers are comparable across reviews.
- [ ] Start with hardware already owned and run for months. Longitudinal data
      ("14 months in, here's the failure mode") is the one thing a years-old wiki
      can offer that a YouTube review cannot, and it cannot be rushed.
- [ ] Decide the voice. The site currently has **zero** first-person testing
      language; reviews need an identity and that is an editorial choice to make
      deliberately.
- [ ] Add `unit_source: purchased | vendor_loan | gifted | reader_submitted` as a
      required field so a review cannot publish without declaring provenance.

### Migration follow-ups

The move from MkDocs Material to Astro + Starlight landed in August 2026. What
it achieved, and what is left:

- [x] 75/75 URL parity, verified by diffing both builds. No redirects needed.
- [x] Nav regrouped into four sections without moving a single file — the
      sidebar is configured independently of disk layout.
- [x] Output 36M → 16M; images 24M → 8.9M via automatic WebP.
- [x] Pagefind search, sitemap, and per-PR preview deployments.
- [x] CI ported to Node; affiliate pipeline taught about `.mdx`.
- [ ] **Update the Cloudflare Pages build settings** to `npm ci && npm run build`,
      output `dist`, `NODE_VERSION=22`. Deploys work without this — the
      compatibility shims cover the old settings — but the shims exist only to
      unblock preprod and should not outlive it.
- [ ] **Then delete the shims**: `tools/mkdocs-compat/`, `requirements.txt`, and
      the `&& node scripts/mirror-output.mjs` from the `build` script in
      `package.json`. Confirm a deploy still succeeds afterwards.
- [ ] **Check "last updated" dates on the deployed site.** Starlight reads git
      history for them, and Cloudflare's clone may be shallow. If every page shows
      the same recent date, that is the cause.
- [ ] Move the buy-link block into the page layout so its position cannot drift.
      This is the structural enforcement of the editorial stance and it touches
      every product page — a deliberate change, not a side effect.
- [ ] Write the editorial policy page that `AffiliateDisclosure` links to
      (`/policies/` currently has no such section).
- [ ] Convert the 8 stale branches. They predate the migration and carry `.md`
      content, so they need converting rather than merging.

### Deployment — open question

- [ ] **Cloudflare Pages vs Workers Static Assets.** Pages works and Pages
      Functions cover server-side needs. Workers adds native cron triggers
      (relevant if comparison tables ever want scheduled price/stock refreshes)
      and is where Cloudflare is directing new development. No urgency.

---

## Contributing

1. Fork, branch (`git checkout -b feature/thing`)
2. Follow the [page conventions](#page-conventions) and the
   [editorial stance](#editorial-stance)
3. Run `npx astro check && npm run build` — both must pass
4. Check your change against the invariants in [AUDIT.md](AUDIT.md)
5. Open a PR

Changes to affiliate links, `.github/`, and `CODEOWNERS` are gated by CI and need
review from a listed CODEOWNER.

### Writing guidelines

- Explain before you recommend
- Include relevant images and diagrams; put them beside the page
- Test all links and code examples
- Give every new page a `slug` pinned to its URL path — CI fails without one
- Add every new page to the `sidebar` in `astro.config.mjs` — pages missing from
  it are reachable only by URL or search, which is how a batch of pages stayed
  invisible for months

---

## License

MIT — see [LICENSE](LICENSE).

## Acknowledgments

- [Voron Design](https://vorondesign.com/) for the original printer designs
- [Ellis' Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/) for tuning reference
- [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/) for the framework
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/), which served this wiki for years
- Everyone who has contributed content, corrections, and test data
