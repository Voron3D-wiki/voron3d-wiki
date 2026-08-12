# Launch and cutover

How the Astro site goes live without dropping traffic, and the evidence that it
is ready to.

**Constraint: zero downtime.** Nothing below takes the site offline. The
sequence is additive — the new site is fully serving on a second hostname and
verified before a single production DNS record changes, and the old deployment
stays intact and rollback-ready until it is deliberately deleted.

---

## Launch readiness — verified 2026-08-04

Every check below was run against the **live MkDocs build from `main`**, not
against assumptions. Reproduce any of them with the commands in
[Re-running these checks](#re-running-these-checks).

| Check | Result |
|:--|:--|
| URL parity vs live site | **75 / 75 identical**, zero drift, no redirects needed |
| Affiliate links | **158 unique URLs, 0 lost, 0 altered** |
| Broken internal links | **0** |
| Broken images | **0** |
| Content loss per page | none — see [note](#content-comparison) |
| Analytics coverage | GA4 + event script on **75 / 75** pages |
| `astro check` | 0 errors, 0 warnings |
| 404 page | present |
| robots.txt / noindex | correct in both environments |

### Content comparison

Comparing rendered word counts page by page flagged six pages where Astro had
less text. All six were investigated and none is content loss:

- **`/MMUs/tradrack`** — the source only ever contained an `# TradRack`
  heading. The layout renders the title itself, so the body is legitimately
  empty. The page was already a stub.
- **`/electronics/stepper-motor/database`, `/printers/v0/bom`,
  `/printers/2.4/BOM-300`, `/printers/2.4/BOM-350`** — the live MkDocs site is
  rendering these tables as **raw markdown**: 1704 literal `|` characters
  dumped as text, and zero `<tr>` elements in the HTML. Astro renders them as
  real tables (141 rows on the database page). The word count drops because the
  pipe characters are gone. **This migration fixes a live production bug.**
- **`/MMUs/BTT-MMU`** — same stub situation as tradrack.

### Regressions found and fixed

Three things worked on the live site and would have broken. All fixed before
launch:

- `printers/enderwire.png` and `printers/v0/voron v0 fridge door.jpg` were
  referenced by raw `<img src>` tags. MkDocs copied every file in `docs/` to the
  output; Astro only emits assets that are imported, so both would have 404'd.
  Converted to Astro image imports.
- `/printers/trident/` linked to `trident.jpg`, which likewise stopped being
  emitted. The surrounding prose says "below is a generic image", so it is now
  an embedded image rather than a link.

Two pre-existing 404s in the bed-levelling index (`assets`, `bed-leveling`)
were also removed. Those 404 on the live site today; they came from the
breadcrumbs plugin's auto-generated index and got baked into content during
conversion.

---

## Environment safety

`src/lib/site-env.mjs` decides whether a build is production. It drives
`robots.txt` and the `noindex` meta tag.

**It defaults to production on purpose.** The failure modes are not symmetric:

- Dev accidentally indexed → a duplicate of the wiki competes with the real one
  in search. Bad, visible, recoverable.
- Production accidentally de-indexed → the site leaves Google, and the affiliate
  revenue with it. Catastrophic, and slow to recover even after a fix ships.

So a forgotten environment variable can never de-index the live site. The dev
deploy has to opt out explicitly:

```
SITE_ENV=preview
```

**Setting that on the dev environment is a required step, not a nice-to-have.**
Verified behaviour:

| Build | `robots.txt` | `noindex` |
|:--|:--|:--|
| default / `SITE_ENV=production` | `Allow: /` + sitemap | absent |
| `SITE_ENV=preview` | `Disallow: /` | on all 75 pages |

---

## Cutover to Workers

Do this only once the dev deploy has been verified. Each step is reversible and
none of them interrupts the live site.

### 1. Stand up dev — no production impact

Production still serves from Pages throughout this step.

1. Add `wrangler.jsonc` and wrangler v4 (assets-only: no `_worker.js`, no
   `functions/`, no bindings).
2. Deploy a `voron3d-wiki-dev` Worker — matching the `jmovfc-dev` /
   `tasktrasker-dev` pattern already used on this account.
3. Set `SITE_ENV=preview` on it. Confirm `/robots.txt` says `Disallow: /`
   **before** attaching any hostname.
4. Point `dev.voron3d.wiki` at it and verify against the checklist above.

### 2. Stand up production Worker — still no cutover

1. Deploy the `voron3d-wiki` Worker with production settings.
2. Verify it on its `workers.dev` URL: URL parity, affiliate links, analytics.
3. Production traffic is still on Pages. Nothing has changed for users.

### 3. Move the domains — the only step users see

Move `voron3d.wiki` and `www.voron3d.wiki` from the Pages project to the
Worker. Both are already Cloudflare-managed zones, so this is a routing change
inside Cloudflare, not a DNS propagation event — the switch is effectively
immediate and there is no window where neither serves.

Immediately after, re-check: a handful of URLs, `/robots.txt` (must be
`Allow: /`), analytics firing, and a known affiliate link resolving to the
right vendor URL.

### 4. Only then, clean up

Leave the Pages project in place for **at least a week** — it is the rollback.
Rolling back means moving the custom domains back, nothing more.

Once you are confident:

- Delete the Pages project
- Delete `tools/mkdocs-compat/` and `requirements.txt`
- Remove `&& node scripts/mirror-output.mjs` from the `build` script and delete
  `scripts/mirror-output.mjs`

All three exist only to work around Pages build settings living in a dashboard.
On Workers that config is `wrangler.jsonc`, in the repo, under the same review
gate as everything else — which is the main reason to make this move at all.

### Rollback

At any point before step 4, rollback is: point the custom domains back at the
Pages project. The Pages deployment is untouched and still current, because
`main` still builds there until you delete it.

---

## Re-running these checks

```bash
# Build the live site for comparison
git worktree add /tmp/mainsite origin/main --detach
(cd /tmp/mainsite && pip install -r requirements.txt && mkdocs build -d /tmp/mkout)

# Build this site
npm ci && npm run build

# URL parity
diff <(find /tmp/mkout -name index.html | sed 's|^/tmp/mkout||; s|/index.html|/|') \
     <(find dist       -name index.html | sed 's|^dist||;       s|/index.html|/|')

# Type + content check
npx astro check

# Environment behaviour
SITE_ENV=preview npm run build && cat dist/robots.txt   # must Disallow
npm run build && cat dist/robots.txt                    # must Allow
```

The affiliate, broken-link, and content-comparison checks are one-off scripts —
see the migration commit for them if they need running again.
