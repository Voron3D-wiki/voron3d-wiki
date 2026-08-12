# Project Audit

State of the wiki, and the things that must not be broken by a change.

**Read the Invariants section before merging anything that touches
`astro.config.mjs`, `.github/`, `package.json`, or the layout of
`src/content/docs/`.** The
content sections are a snapshot and go stale — see
[Regenerating this document](#regenerating-this-document).

Last updated: 2026-08-01 (75 content pages, 0 build warnings)

---

## Invariants

These are load-bearing. Breaking one either takes the site down, breaks the
build, or reopens a security hole. Each has a check you can actually run.

| # | Invariant | Why it matters | How to check |
|:--|:----------|:---------------|:-------------|
| 1 | `npm run build` exits 0, and `npx astro check` is clean | Broken internal links, bad frontmatter, and bad component props are build failures. The tree is warning-clean; keep it there. | `npx astro check && npm run build` |
| 2 | Every content page is `<name>/index.mdx` | Images live beside the page they belong to. Flat `<page>.mdx` files break that and scatter assets. | `find src/content/docs -name '*.mdx' ! -name 'index.mdx'` should return nothing |
| 3 | **No live URL changes without a recorded decision** | A page's URL is its content directory path. Renaming a directory moves a live URL; 21 of them carry inbound links and search rankings. `urls.txt` is the committed manifest of every URL the site serves. | The `Verify no URL changed` step in `build-checks.yml`, via `scripts/check-urls.mjs`; fails the build |
| 4 | Every content page is in the `sidebar` in `astro.config.mjs` | Pages absent from it are reachable only by URL or search. This is how the April 2026 pages stayed invisible for months. | See the sidebar check in [Regenerating](#regenerating-this-document) |
| 5 | Cloudflare Pages deploys from git — **do not add a deploy step** | Pages is connected to this repo directly. A workflow deploy step is a redundant second path and needs a secret URL in the repo. A hardcoded deploy hook lived here until 2026-08 and was publicly readable the whole time. | `grep -rn 'deploy_hook\|api.cloudflare.com' .github/` returns nothing |
| 6 | `affiliate-link-check.yml` must never execute anything from `./pr` | It runs on `pull_request_target`, so it has the App private key and a write token, and any fork can trigger it. Executing PR-supplied code there hands an attacker the key. Scripts come from the trusted `./base` checkout only. | Read the SECURITY NOTE at the top of the workflow before editing it |
| 7 | Both checkouts in that workflow are pinned to a **SHA**, not a branch | A branch ref lets an attacker push new code between the permission check and the use of it. | `grep -n 'ref:' .github/workflows/affiliate-link-check.yml` — both should be `.sha` |
| 8 | Google Analytics is configured in **one** place — `astro.config.mjs` `head` | A second `gtag('config', ...)` for the same property double-counts every page view. That bug was live until 2026-08. `public/js/analytics.js` sends events only and must never call `config`. | `grep -rn "gtag('config'" src public astro.config.mjs` — exactly one hit |
| 9 | GA's `url_passthrough` and `linker` stay **off** | They decorate outbound URLs with `_gl=` params, which breaks affiliate attribution. This was diagnosed in `c53bee2` and is the reason the GA config is hand-rolled rather than using an integration. | `grep -n 'url_passthrough' astro.config.mjs` — must be `false` |
| 10 | `package.json` + `package-lock.json` are the production dependency list | Cloudflare runs `npm ci && npm run build`. `npm ci` fails outright if the lockfile is out of sync with `package.json`. | `npm ci` succeeds from a clean checkout |
| 11 | The affiliate pipeline matches `.mdx` | Content pages are `.mdx`. `affiliate_links.py` and the workflow globs filter by extension; missing `.mdx` means affiliate tags stop being autofixed and link changes stop being gated — silently. | `grep -n 'mdx' .github/scripts/affiliate_links.py .github/workflows/affiliate-link-check.yml` |

### Not pages

Content lives in `src/content/docs/`. Everything under it is a routable page —
there is no equivalent of MkDocs' `exclude_docs`.

The shared blocks that used to be `{% include %}` partials are now components in
`src/components/`:

```
src/components/AffiliateDisclosure.astro   used by 29 pages
src/components/WorkInProgress.astro        used by 11 pages
```

A page imports what it needs:

```mdx
import AffiliateDisclosure from '~/components/AffiliateDisclosure.astro';
```

Three client scripts ship from `public/js/` and are wired in `astro.config.mjs`:

```
analytics.js        GA4 custom events + the affiliate click guard
external-links.js   external links open in a new tab
tablesort.js        click-to-sort table headers
```

Two pages sit outside the usual rules:

- `src/content/docs/index.mdx` — the site root, and the only page with no `slug:`
- `src/content/docs/policies/index.mdx` — a real page, kept out of the sidebar on
  purpose and reached from the footer link

---

## Deployment

| | |
|:--|:--|
| Host | Cloudflare Pages, project `voron3d-wiki` |
| Source | GitHub `Voron3D-wiki/voron3d-wiki`, git integration |
| Production branch | `main` |
| Build command | `npm ci && npm run build` (target) |
| Output directory | `dist` (target) |
| Node version | 22 (`NODE_VERSION`, also pinned in `.node-version`) |

The dashboard may still hold the MkDocs values. Two shims make the deploy work
either way — `scripts/mirror-output.mjs` publishes to both `dist/` and `site/`,
and `tools/mkdocs-compat/` provides a `mkdocs` command that runs the Astro
build. Both are temporary; remove them once the dashboard is updated.
| Domains | `voron3d.wiki`, `www.voron3d.wiki` → `voron3d-wiki.pages.dev`, proxied |
| Previews | automatic per-branch |

Cloudflare builds the site itself. GitHub Actions only *validates* — nothing in
`.github/` deploys. CI additionally runs `astro check` and the slug guard, so it
is the stricter gate of the two.

**There are no ads.** AdSense was removed entirely in 2026-08 — it earned about
35 cents a month, which did not justify the markup or the third-party script.
Gone: both ad partials, the 60 `footer-AD` includes, the `_templates/ads.html`
snippet, and `docs/ads.txt`. Do not reintroduce an ad network without deciding
that trade again.

Revenue now comes from affiliate links only. Those are unrelated to AdSense and
stay — see the affiliate disclosure partial and `affiliate-link-check.yml`.

---

## CI workflows

| Workflow | Trigger | Does |
|:---------|:--------|:-----|
| `build-checks.yml` | push to `main`, all PRs | `astro check`, `npm run build`, and the slug guard |
| `docs-validation.yml` | push to `main`, PRs to `main` | Trivy scan, `npm run build`, large-file warning |
| `affiliate-link-check.yml` | `pull_request_target` on `main` | Autofixes West3D/OneTwo3D affiliate tags, gates external-link and workflow changes behind CODEOWNERS |

`build-checks.yml` and `docs-validation.yml` both run `npm run build`. That
duplication is known and harmless.

Both checkouts use `fetch-depth: 0`, because `src/lib/git-dates.mjs` reads full
git history to produce each page's date. A shallow clone silently dates every
page to today.

---

## Content conventions

Adding a page:

1. `mkdir src/content/docs/<section>/<page-name>/`
2. Create `index.mdx` with frontmatter — `title`, `description`, and a `slug:`
   pinned to the URL path
3. Put its images in that same folder, reference them by bare filename
4. Add it to the `sidebar` in `astro.config.mjs`
5. `npx astro check && npm run build`

Frontmatter for a new page at `/electronics/fans/`:

```yaml
---
title: 'Part Cooling'
description: 'Guide to part cooling options for Voron printers'
slug: 'electronics/fans'
---
```

The `slug` is not optional. See invariant 3 — CI fails without it.

Pages carrying affiliate links end with the disclosure component, **after** the
content it is disclosing:

```mdx
import AffiliateDisclosure from '~/components/AffiliateDisclosure.astro';

...page content...

<AffiliateDisclosure />
```

Pages still being written can carry `<WorkInProgress />`, usually just after the
intro.

Page-to-page transclusion (the 2.4 overview embedding its BOMs, the stepper
overview embedding the database) is an MDX import of the other page:

```mdx
import IncPrinters24Bom300 from './BOM-300/index.mdx';

<IncPrinters24Bom300 />
```

That keeps one source of truth — the embedded page is still a real page at its
own URL.

### MDX is stricter than the old Markdown

Content is MDX now, which is CommonMark plus JSX. Three things that were legal
under Python-Markdown are errors here:

- **A bare `<` is a tag opener.** `(<5A)` and `length < 1 meter` are parse
  errors. Write `&lt;` or wrap in backticks. This is the most common one on a
  hardware wiki, because specs are full of comparison operators.
- **Headings need a space.** `###2507` renders as a heading in Python-Markdown
  and as literal text in CommonMark.
- **HTML must be valid JSX.** `class=` is `className=`, `style=` takes an object,
  and void elements self-close: `<br />`, `<img ... />`.

---

## Current state — 2026-08-02

75 content pages, migrated from MkDocs to Astro. The Starlight theme was later
removed in favour of a layout of the site's own; the content was untouched by
that change.
`astro check` and `npm run build` both pass clean, and the built URL set is
identical to the MkDocs site it replaced (75/75, verified by diffing both
outputs).

### Stalest content

Ranked by last *substantive* edit (a commit changing ≥12 lines), following
renames. Link-only and formatting passes are excluded, so these dates are older
than what GitHub's file list shows.

| Last real edit | Page | Words |
|:---------------|:-----|------:|
| 2024-12-08 | `bedleveling/eddy-coil/` | 373 |
| 2024-12-15 | `MMUs/ERCF/` | 943 |
| 2025-01-25 | `MMUs/Anycubic-MMU/` | 149 |
| 2025-01-25 | `software/klipper/` | 346 |
| 2025-01-27 | `MMUs/PICO-MMU/` | 531 |
| 2025-01-29 | `printhead/toolhead-boards/mks-thr/` | 234 |
| 2025-02-01 | `software/klipper-config-help/` | 109 |
| 2025-02-10 | `guides/` | 226 |
| 2025-04-30 | `bedleveling/cartographer/` | 601 |
| 2025-04-30 | `bedleveling/beacon/` | 617 |
| 2025-05-01 | `printhead/stealthburner/` | 22 |
| 2025-05-01 | `electronics/safety/` | 410 |

**29 of 75 pages have not had a substantive edit in over 12 months.**

Highest priority: `software/klipper/` and the two probe pages
(`beacon`, `cartographer`) are heavily-trafficked topics that move fast.
`MMUs/BTT-MMU/` is factually wrong — it still predicts a "q3 2025 release".

### Thinnest pages

| Words | Page | In nav? |
|------:|:-----|:--------|
| 2 | `MMUs/tradrack/` | yes |
| 22 | `printhead/stealthburner/` | yes |
| 30 | `MMUs/BTT-MMU/` | yes |
| 34 | `printhead/mini-afterburner/` | no |
| 40 | `printers/legacy/v1-8/` | yes |
| 42 | `printhead/afterburner/` | no |
| 42 | `printhead/hotends/chcXL/` | no |
| 47 | `printers/DoomCube/duelingZero/` | no |
| 50 | `MMUs/Pursa-MMU/` | yes |
| 53 | `printers/commercial/` | no |
| 59 | `printers/Printers-for-ants/` | no |

15 of 75 pages are under 100 words.

Also worth noting: coverage across the flagship printers is lopsided. V0 is
~1200 words; Trident is ~190 and V2.4 ~370, despite being the more commonly
built machines.

### Placeholder pages, deliberately not in nav

These have real titles and frontmatter but only a few lines of orientation.
They are kept out of the nav so the menu does not advertise empty pages. Add
the nav entry when the page has content.

```
printhead/afterburner/          printhead/mini-afterburner/
printhead/cooling/              printhead/hotends/chcXL/
printers/commercial/            printers/Printers-for-ants/
printers/DoomCube/duelingZero/  software/shakeAndtune/
```

---

## Open items

| Item | Notes |
|:-----|:------|
| Delete the old Cloudflare deploy hook | Nothing calls it since 2026-08, but it is still live and publicly readable in git history. Delete rather than rotate. |
| Register GA4 custom dimensions | The events fire, but `vendor`, `product`, `placement`, `page_section` and `destination` stay invisible in reports until registered under Admin → Custom definitions as event-scoped. Silent failure. |
| Retire the affiliate `preventDefault()` guard | `public/js/analytics.js` still intercepts affiliate clicks and opens them manually. That was a workaround for GA decorating URLs; `url_passthrough: false` is the real fix. Confirm clicks land clean in the vendor dashboards first. |
| Verify "last updated" dates on the live site | Cloudflare builds the site, and `src/lib/git-dates.mjs` needs a full clone. If the live footer dates are all the same recent day, Cloudflare's clone is shallow and every date on the wiki is wrong. Fix would be to build in Actions and upload the artifact. |
| 4 Dependabot alerts (moderate) | On `main`, pre-existing. The ad-hoc ESLint/Prettier install that raised them is gone with the old build job; re-check whether these still apply. |
| No `LICENSE` file | `README.md` states MIT and links to a `LICENSE` that does not exist. |
| 19 `coming soon` markers | Inside otherwise-complete pages. `grep -rn "coming soon" src/content/docs/` |
| 8 stale branches | Oldest from 2026-01; `adding-more-west3d-links` is 28 commits ahead of main. These predate the Astro migration and will need converting, not just merging. |
| `BTT-EBB-Gen1` duplicates ~130 lines | The same flashing instructions appear twice. The second copy was wrapped in a `.mkdocs-tabs` widget that never had CSS; the migration stripped the dead wrapper but kept both copies. Pick one. |
| `electronics/fans` had 17 malformed headings | `###2507` with no space. Repaired during migration — noted here because the same mistake will now fail visibly rather than silently render. |

---

## Pre-merge checklist

- [ ] `npx astro check` is clean
- [ ] `npm run build` passes
- [ ] New pages have a `slug:` pinned to their URL path
- [ ] New pages are in the `sidebar` in `astro.config.mjs`
- [ ] Images sit beside the page that uses them
- [ ] Affiliate pages carry `<AffiliateDisclosure />`, at the bottom
- [ ] Buy links are page footers, not heroes — see the editorial stance in README
- [ ] If a dependency changed: `package-lock.json` is committed too

---

## Regenerating this document

```bash
# Invariant 2 - pages outside the <name>/index.mdx convention
find src/content/docs -name '*.mdx' ! -name 'index.mdx'

# Invariant 3 - pages missing a pinned slug
for f in $(find src/content/docs -name '*.mdx'); do
  [ "$f" = "src/content/docs/index.mdx" ] && continue
  grep -q '^slug:' "$f" || echo "no slug: $f"
done

# Invariant 4 - content pages missing from the sidebar
pages=$(find src/content/docs -name 'index.mdx' \
  | sed 's|^src/content/docs/||; s|/index.mdx$||; s|^index.mdx$||' | sort -u)
nav=$(grep -oE "link: '/[^']*'" astro.config.mjs \
  | sed "s|link: '/||; s|/'||" | sort -u)
comm -23 <(echo "$pages") <(echo "$nav")

# Invariant 8 - GA configured exactly once
grep -rn "gtag('config'" src public astro.config.mjs

# Staleness - last substantive edit per page, following renames
find src/content/docs -name 'index.mdx' -print0 | while IFS= read -r -d '' f; do
  printf '%s\t%s\n' "$(git log --follow --format=%as -1 -- "$f")" "$f"
done | sort
```

The content sections above are a snapshot. Regenerate them when they start
disagreeing with the tree.
