# Project Audit

State of the wiki, and the things that must not be broken by a change.

**Read the Invariants section before merging anything that touches
`mkdocs.yml`, `.github/`, `requirements.txt`, or the layout of `docs/`.** The
content sections are a snapshot and go stale — see
[Regenerating this document](#regenerating-this-document).

Last updated: 2026-08-01 (75 content pages, 0 build warnings)

---

## Invariants

These are load-bearing. Breaking one either takes the site down, breaks the
build, or reopens a security hole. Each has a check you can actually run.

| # | Invariant | Why it matters | How to check |
|:--|:----------|:---------------|:-------------|
| 1 | `mkdocs build --strict` exits 0 | Broken links, missing nav targets, and bad plugin options are all build failures. The tree is warning-clean; keep it there. | `mkdocs build --strict` |
| 2 | Every content page is `<name>/index.md` | Images live beside the page they belong to. Flat `<page>.md` files break that and scatter assets. | `find docs -name '*.md' ! -name 'index.md'` should return only the partials in [Not pages](#not-pages) |
| 3 | Every content page is in `nav` | Pages absent from `mkdocs.yml` are reachable only by URL or search. This is how the April 2026 pages stayed invisible for months. | See the nav check in [Regenerating](#regenerating-this-document) |
| 4 | Cloudflare Pages deploys from git — **do not add a deploy step** | Pages is connected to this repo directly. A workflow deploy step is a redundant second path and needs a secret URL in the repo. A hardcoded deploy hook lived here until 2026-08 and was publicly readable the whole time. | `grep -rn 'deploy_hook\|api.cloudflare.com' .github/` returns nothing |
| 5 | `affiliate-link-check.yml` must never execute anything from `./pr` | It runs on `pull_request_target`, so it has the App private key and a write token, and any fork can trigger it. Executing PR-supplied code there hands an attacker the key. Scripts come from the trusted `./base` checkout only. | Read the SECURITY NOTE at the top of the workflow before editing it |
| 6 | Both checkouts in that workflow are pinned to a **SHA**, not a branch | A branch ref lets an attacker push new code between the permission check and the use of it. | `grep -n 'ref:' .github/workflows/affiliate-link-check.yml` — both should be `.sha` |
| 7 | `extra_javascript` filenames match the files on disk | A typo here fails silently: the browser 404s and the script never runs. `block-affiliate-tracking.js` was misspelled on disk for months, so the affiliate tracking blocker never loaded in production. | See the JS check in [Regenerating](#regenerating-this-document) |
| 8 | Google Analytics is configured in **one** place | `mkdocs.yml` `extra.analytics` makes Material inject gtag. A second manual `gtag('config', ...)` for the same property double-counts every page view. That bug was live until 2026-08. | `grep -rn 'gtag(' docs/javascripts overrides` — should not configure `G-7E70MV2KN4` |
| 9 | `{% include %}` paths track file moves | The include plugin resolves real paths. Moving a page without fixing its includes is a **build failure**, and it only shows up under `--strict`. | Covered by invariant 1 |
| 10 | `requirements.txt` is the production dependency list | Cloudflare runs `pip install -r requirements.txt && mkdocs build`. Adding a plugin to `mkdocs.yml` without adding it here breaks the live build, not just CI. | Every `plugins:` entry has a matching package |

### Not pages

`{% include %}` partials and templates, not routable pages. These three are the
**only** legitimate output of the invariant 2 check — anything else it prints is
a page that needs moving into a folder:

```
docs/affiliate-disclosure.md
docs/_templates/page_template.md
docs/_templates/work-in-progress.md
```

Two more sit outside the usual rules without showing up in that check:

- `docs/index.md` — the site root
- `docs/policies/index.md` — a real page, kept out of `nav` on purpose and
  reached from the footer link

---

## Deployment

| | |
|:--|:--|
| Host | Cloudflare Pages, project `voron3d-wiki` |
| Source | GitHub `Voron3D-wiki/voron3d-wiki`, git integration |
| Production branch | `main` |
| Build command | `pip install -r requirements.txt && mkdocs build` |
| Output directory | `site` |
| Domains | `voron3d.wiki`, `www.voron3d.wiki` → `voron3d-wiki.pages.dev`, proxied |
| Previews | automatic per-branch |

Cloudflare builds the site itself. GitHub Actions only *validates* — nothing in
`.github/` deploys. Note that Actions builds with `--strict` while Cloudflare
builds without it, so CI is the stricter gate of the two.

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
| `build-checks.yml` | push to `main`, all PRs | Prettier/ESLint (non-blocking), then `mkdocs build --strict` |
| `docs-validation.yml` | push to `main`, PRs to `main` | Trivy scan, `mkdocs build --strict`, large-file warning |
| `affiliate-link-check.yml` | `pull_request_target` on `main` | Autofixes West3D/OneTwo3D affiliate tags, gates external-link and workflow changes behind CODEOWNERS |

`build-checks.yml` and `docs-validation.yml` both run `mkdocs build --strict`.
That duplication is known and harmless.

Both checkouts that feed the MkDocs build use `fetch-depth: 0`, because
`git-revision-date-localized` reads full history to produce each page's "last
updated" date. A shallow clone silently dates every page to today.

---

## Content conventions

Adding a page:

1. `mkdir docs/<section>/<page-name>/`
2. Copy `docs/_templates/page_template.md` to `<page-name>/index.md`
3. Put its images in that same folder, reference them by bare filename
4. Add it to `nav` in `mkdocs.yml`
5. `mkdocs build --strict`

Pages carrying affiliate links should end with:

```
{% include "affiliate-disclosure.md" %}
```

Pages that are still being written can carry the notice partial, usually just
after the intro:

```
{% include "_templates/work-in-progress.md" %}
```

There is no ad include. If you find one in an old branch, drop it.

MkDocs uses directory URLs, so `<page>.md` and `<page>/index.md` serve the same
URL. The 2026-08 restructure changed no published links.

---

## Current state — 2026-08-01

75 content pages. `mkdocs build --strict` passes with zero warnings.

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
| Second GA property | `overrides/main.html` hardcodes `G-VPL8R0L9Z1` alongside `G-7E70MV2KN4` in `mkdocs.yml`. Two properties collect in parallel. Intentional or leftover? |
| Verify "last updated" dates on the live site | Cloudflare builds the site, and `git-revision-date-localized` needs a full clone. If the live footer dates are all the same recent day, Cloudflare's clone is shallow and every date on the wiki is wrong. Fix would be to build in Actions and upload the artifact. |
| 4 Dependabot alerts (moderate) | On `main`, pre-existing. Likely the npm packages the format-check job installs. |
| No `LICENSE` file | `README.md` states MIT and links to a `LICENSE` that does not exist. |
| 19 `coming soon` markers | Inside otherwise-complete pages. `grep -rn "coming soon" docs/` |
| 8 stale branches | Oldest from 2026-01; `adding-more-west3d-links` is 28 commits ahead of main. |

---

## Pre-merge checklist

- [ ] `mkdocs build --strict` passes
- [ ] New pages are `<name>/index.md` with images in the same folder
- [ ] New pages are in `nav`
- [ ] No deploy step added to any workflow
- [ ] If `affiliate-link-check.yml` changed: nothing from `./pr` is executed, refs still pinned to SHAs
- [ ] If a plugin was added to `mkdocs.yml`: it is also in `requirements.txt`
- [ ] If pages moved: `{% include %}` paths updated
- [ ] This file updated if any invariant or the deploy setup changed

---

## Regenerating this document

```bash
# Invariant 2 - pages outside the <name>/index.md convention
find docs -name '*.md' ! -name 'index.md'

# Invariant 3 - content pages missing from nav
nav=$(grep -oE '[A-Za-z0-9_/.-]+\.md' mkdocs.yml | sort -u)
for f in $(find docs -name 'index.md' | sed 's|^docs/||'); do
  echo "$nav" | grep -qx "$f" || echo "NOT IN NAV: $f"
done

# Invariant 7 - extra_javascript entries that do not exist on disk
grep -oE 'javascripts/[A-Za-z0-9._-]+\.js' mkdocs.yml | sort -u | while read -r p; do
  [ -f "docs/$p" ] || echo "MISSING: $p"
done

# Staleness - last substantive edit per page, following renames
for f in $(find docs -name '*.md' | sort); do
  git log --follow --format='%H %cs' --numstat -- "$f" | awk -v F="$f" '
    /^[0-9a-f]{40} /{d=$2; next}
    /^[0-9]+\t[0-9]+\t/{ if ($1+$2 >= 12) { print d "\t" F; exit } }'
done | sort

# Word counts, excluding frontmatter, includes, and link URLs
# (see the Current state section for the exact method)
```
