# TODO

## Content — needs a human pass

- [ ] `/bedleveling/cartographer/` — needs a slight reword
- [ ] `/bedleveling/beacon/` — needs slight adjustments
- [ ] `/printers/2.4/` — main V2.4 page needs work; passable for now
- [ ] `/printers/trident/` — almost empty. The BOM section just says "Coming
      soon," and Hardware / Kits / Printed Parts / Mods are bare link lists
      with no description or context. Needs real content written, not a code
      fix — see `src/content/docs/printers/trident/index.mdx`.

## Reviewed, no action needed

- `/electronics/stepper-motor/database/` — solid
- `/printers/2.4/BOM-300/` — fine

## Fixed (2026-09-16)

- [x] Images stretched/squeezed across the site — `src/styles/tokens.css` was
      missing `height: auto`, so any image with explicit width/height
      attributes kept its pixel height while the width shrank to fit its
      column. Affected every page with a locally-imported image, reported
      first on `/software/klipper/` and `/printers/v0/`.
- [x] `/printers/v0/` — "Metal Bed Replacements" table had a 4-column header
      but only 3 columns of data (`Documentation/Info` was never filled in,
      predates the Astro migration). Dropped the empty column.
- [x] `/printers/2.4/BOM-300/` and `/printers/2.4/BOM-350/` — both parts
      tables ended in a dangling, data-less `| Misc |` row (predates the
      migration). Removed it.
- [x] `/printhead/hotends/` — Triangle Labs CHC XL row was missing a column
      separator, merging the photo and buy-link cells; Heatcore 4 and Goliath
      rows had stray `!(...)` characters wrapping their images. Fixed all
      three rows.
