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

`docs/electronics/fans/index.md` is the reference implementation — it opens with
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
├── docs/                  # Content (production). 75 pages of markdown.
│   ├── assets/            # Site-wide assets (logo, favicon)
│   ├── javascripts/       # analytics.js, external-links.js, tablesort.js
│   ├── stylesheets/       # extra.css
│   ├── tools/             # Reusable partials pulled in with {% include %}
│   └── _templates/        # Page scaffold to copy when starting a page
├── overrides/             # Material theme override — loads GA4
├── astro/                 # Astro + Starlight evaluation build (NOT deployed)
├── .github/               # CI: affiliate link checks, build validation
├── AUDIT.md               # Invariants + current state. Read before merging.
├── mkdocs.yml             # Production site config
└── requirements.txt       # Production Python dependencies
```

### Two stacks, one content tree

| | Production | Evaluation |
|:--|:--|:--|
| **Stack** | MkDocs Material | Astro + Starlight |
| **Lives in** | `docs/` + `mkdocs.yml` | `astro/` |
| **Deployed?** | **Yes** — Cloudflare Pages, git-connected | No |
| **Build** | `mkdocs build --strict` | `cd astro && npm run build` |

`astro/` is a **proof of concept for a possible migration, not a second site.**
It does not deploy and does not need to be kept passing to merge content.

Critically, it has **no separate copy of the content**. `astro/scripts/convert.mjs`
projects `docs/` into `astro/src/content/docs/` on demand, so `docs/` stays the
single source of truth. If you write content, write it in `docs/`.

```bash
cd astro
npm install
npm run convert   # regenerate from ../docs
npm run dev       # preview at localhost:4321
```

The converter reports anything it could not translate confidently rather than
emitting silently-wrong output. Currently one page is flagged — see [TODO](#todo).

---

## Running the production site

```bash
pip install -r requirements.txt
mkdocs serve          # http://127.0.0.1:8000
mkdocs build --strict # CI runs this; it must exit 0
```

`--strict` fails on broken internal links, missing nav targets, and bad plugin
options. Run it before opening a PR.

---

## Page conventions

**Every content page is `<name>/index.md`, with its images in that same folder.**
One topic, one folder.

```
docs/printhead/toolhead-boards/mks-thr/
├── index.md
├── MKS-UTC-conf.png
└── MKS-THR-36-42-conf.png
```

A page's URL is its folder path, so adding a screenshot means dropping the file
next to `index.md` and referencing it by bare filename. To add a page:

1. `mkdir docs/<section>/<page-name>/`
2. Copy `docs/_templates/page_template.md` to `<page-name>/index.md`
3. Put images in the same folder
4. Add it to `nav` in `mkdocs.yml`

Do not create flat `docs/<section>/<page>.md` files. The only exceptions are
`docs/index.md`, `docs/tools/`, and `docs/_templates/`.

### Reusable partials

`docs/tools/` holds snippets used on more than one page — currently the affiliate
disclosure and the work-in-progress notice:

```
{% include "tools/affiliate-disclosure.md" %}
```

Both `tools/` and `_templates/` are in `exclude_docs`, so they render into pages
but are never served as pages themselves.

---

## Analytics

GA4 property **G-7E70MV2KN4**, configured in exactly one place: `overrides/main.html`.

**Do not add an `analytics:` block to `mkdocs.yml`.** Material's built-in provider
does not expose `url_passthrough` or `linker`, and it was previously diagnosed
(`c53bee2`) as decorating outbound URLs with `_gl=` params, which breaks affiliate
attribution. That is why the config is hand-rolled.

Custom events live in `docs/javascripts/analytics.js`:

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
- [ ] **Retire the `preventDefault()` guard** in `analytics.js` once the above
      confirms URLs are no longer being decorated. It is a workaround; the
      `url_passthrough: false` config is the actual fix.
- [ ] Consider routing affiliate links through `/go/<slug>` with a `_redirects`
      map — changes vendor URLs in one place instead of 54 files, and enables
      server-side click logging that ad blockers cannot suppress.

### Content bugs

- [ ] **`docs/printhead/toolhead-boards/BTT-EBB-Gen1/index.md` has duplicate
      content.** Lines ~69–197 and ~198–360 are the same instructions twice. The
      second copy is wrapped in a hand-rolled `.mkdocs-tabs` widget whose CSS was
      never written, so it renders as inert divs today and the tags are left
      unclosed. Needs an editorial fix: pick one copy, or convert to real tabs.
- [ ] **`docs/electronics/fans/index.md` has 17 malformed headings** — `###2507`
      with no space after the hashes. Python-Markdown renders those as headings so
      the page looks fine today, but it is not valid CommonMark and any stricter
      parser drops them to plain text. Worth fixing at source either way.
- [ ] **Non-Voron printers are buried.** ~285 lines covering Siboor Enderwire,
      Sovol SV08 and others sit at the bottom of `docs/printers/index.md`,
      invisible to navigation. This is monetized content nobody can find. Promote
      it to its own section.
- [ ] **`docs/guides/` is one page of outbound links** to Ellis's tuning guide,
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

### Framework decision — open

- [ ] **Decide: stay on MkDocs, or migrate to Astro + Starlight.** The `astro/`
      build exists to make this decision on evidence rather than argument.
      Findings so far:
      - 75/75 URL parity, verified by diffing both builds. No redirects needed.
      - Output 36M → 16M; images 24M → 8.9M via automatic WebP.
      - Ships Pagefind search, sitemap, and per-PR previews.
      - Nav can be regrouped without moving a single file — Starlight's sidebar is
        configured independently of disk layout, so the reorganisation carries
        zero SEO risk.
      - Upstream pressure: the Material build now warns that **MkDocs 2.0 removes
        the plugin system and breaks all theme overrides, with no migration path.**
        This repo uses 9 plugins and 1 theme override. Verify their current
        position before weighting this heavily.
- [ ] If migrating: rewrite `.github/scripts/affiliate_links.py` paths if `docs/`
      moves. It operates on raw markdown diffs, so it survives the move as long as
      content stays markdown — which is why Starlight was chosen over anything
      that converts content to JSX.
- [ ] If staying: run a one-time `cwebp` pass over `docs/`. 29MB of unoptimized
      images is the single biggest performance win available, and MkDocs will not
      do it automatically.

### Deployment — open question

- [ ] **Decide Cloudflare Pages vs Workers Static Assets.** Pages works today and
      Pages Functions cover server-side needs. Workers adds native cron triggers
      (relevant if comparison tables ever want scheduled price/stock refreshes) and
      is where Cloudflare is directing new development. No urgency; best done at
      the same time as a framework migration, not as a separate change.

---

## Contributing

1. Fork, branch (`git checkout -b feature/thing`)
2. Follow the [page conventions](#page-conventions) and the
   [editorial stance](#editorial-stance)
3. Run `mkdocs build --strict` — it must exit 0
4. Check your change against the invariants in [AUDIT.md](AUDIT.md)
5. Open a PR

Changes to affiliate links, `.github/`, and `CODEOWNERS` are gated by CI and need
review from a listed CODEOWNER.

### Writing guidelines

- Explain before you recommend
- Include relevant images and diagrams; put them beside the page
- Test all links and code examples
- Add every new page to `nav` in `mkdocs.yml` — pages missing from it are
  reachable only by URL or search, which is how a batch of pages stayed invisible
  for months

---

## License

MIT — see [LICENSE](LICENSE).

## Acknowledgments

- [Voron Design](https://vorondesign.com/) for the original printer designs
- [Ellis' Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/) for tuning reference
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) for the current framework
- Everyone who has contributed content, corrections, and test data
