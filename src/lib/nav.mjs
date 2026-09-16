// The site's navigation tree, and the helpers that read it.
//
// This used to live inside the Starlight integration config, which meant the
// nav shape and the components that rendered it were owned by different layers.
// It is plain data here: one tree, and pure functions over it. Anything that
// needs to know "where am I" — sidebar, section switcher, breadcrumbs,
// prev/next — derives it from this file, so they cannot disagree.
//
// NOTE ON URLS
//
// Every `href` is a real URL pinned to the path the page served at under
// MkDocs. Content files sit at the matching directory, so `/printers/2.4/` is
// `src/content/docs/printers/2.4/index.mdx`. Case and dots are significant —
// `/MMUs/` is not `/mmus/` — and `scripts/check-nav.mjs` fails the build if a
// href here has no page behind it.

export const NAV = [
  {
    label: 'Printers',
    blurb: 'Pick a machine and build it.',
    items: [
      { label: 'Choosing a printer', href: '/printers/' },
      {
        label: 'Voron V0',
        items: [
          { label: 'Overview', href: '/printers/v0/' },
          { label: 'V0.2 BOM', href: '/printers/v0/bom/' },
        ],
      },
      {
        label: 'Voron V2.4',
        items: [
          { label: 'Overview', href: '/printers/2.4/' },
          { label: 'BOM — 300mm', href: '/printers/2.4/BOM-300/' },
          { label: 'BOM — 350mm', href: '/printers/2.4/BOM-350/' },
        ],
      },
      { label: 'Voron Trident', href: '/printers/trident/' },
      { label: 'Voron Switchwire', href: '/printers/switchwire/' },
      {
        label: 'Legacy',
        items: [
          { label: 'Overview', href: '/printers/legacy/' },
          { label: 'Voron V1.6', href: '/printers/legacy/v1-6/' },
          { label: 'Voron V1.8', href: '/printers/legacy/v1-8/' },
        ],
      },
      {
        label: 'DoomCube',
        items: [
          { label: 'Overview', href: '/printers/DoomCube/' },
          { label: 'Tri Zero', href: '/printers/DoomCube/TriZero/' },
        ],
      },
    ],
  },

  {
    // Everything you choose and buy, in one branch. Motherboards and toolhead
    // boards previously sat in different top-level sections despite answering
    // the same question.
    label: 'Components',
    blurb: 'Choose the parts that go in it.',
    items: [
      {
        label: 'Electronics',
        items: [
          { label: 'How to choose', href: '/electronics/' },
          {
            label: 'Motherboards',
            items: [
              { label: 'Overview', href: '/electronics/mcu/' },
              { label: 'BTT SKR Series', href: '/electronics/mcu/btt-skr/' },
              { label: 'Mellow Fly', href: '/electronics/mcu/mellow-fly/' },
              { label: 'MKS', href: '/electronics/mcu/mks/' },
              { label: 'Octopus', href: '/electronics/mcu/octopus/' },
            ],
          },
          {
            label: 'Toolhead Boards',
            items: [
              { label: 'Overview', href: '/printhead/toolhead-boards/' },
              { label: 'BTT EBB Gen1', href: '/printhead/toolhead-boards/BTT-EBB-Gen1/' },
              { label: 'BTT EBB Gen2', href: '/printhead/toolhead-boards/BTT-EBB-Gen2/' },
              { label: 'FLY-SHT', href: '/printhead/toolhead-boards/FLY-SHT/' },
              { label: 'FLY-SB2040', href: '/printhead/toolhead-boards/FLY-SB2040/' },
              { label: 'LDO Orbitool 3', href: '/printhead/toolhead-boards/ldo-orbitool-3/' },
              { label: 'LDO Orbitool O2', href: '/printhead/toolhead-boards/ldo-orbitool-o2/' },
              { label: 'MKS-THR', href: '/printhead/toolhead-boards/mks-thr/' },
            ],
          },
          {
            label: 'Stepper Motors',
            items: [
              { label: 'Overview', href: '/electronics/stepper-motor/' },
              { label: 'Motor database', href: '/electronics/stepper-motor/database/' },
            ],
          },
          { label: 'Fans', href: '/electronics/fans/' },
          { label: 'Power Supplies', href: '/electronics/power-supplies/' },
          { label: 'Wiring', href: '/electronics/wiring/' },
          { label: 'Connectors', href: '/electronics/connectors/' },
          { label: 'RP2040 Info', href: '/electronics/rp2040/' },
          { label: 'Safety', href: '/electronics/safety/' },
        ],
      },
      {
        label: 'Printhead',
        items: [
          { label: 'Overview', href: '/printhead/' },
          {
            label: 'Hotends',
            items: [
              { label: 'How to choose', href: '/printhead/hotends/' },
              { label: 'DropEffect NExt G', href: '/printhead/hotends/dropeffect-nextg/' },
              { label: 'E3D Revo Voron', href: '/printhead/hotends/e3d-revo/' },
              { label: 'E3D V6', href: '/printhead/hotends/e3d-v6/' },
              { label: 'Phaetus Dragon', href: '/printhead/hotends/phaetus-dragon/' },
              { label: 'Phaetus Rapido', href: '/printhead/hotends/phaetus-rapido/' },
            ],
          },
          { label: 'Extruders', href: '/printhead/extruders/' },
          { label: 'Nozzles', href: '/printhead/nozzle/' },
          { label: 'Stealthburner', href: '/printhead/stealthburner/' },
        ],
      },
      {
        label: 'Bed Leveling',
        items: [
          { label: 'How to choose', href: '/bedleveling/' },
          { label: 'Beacon', href: '/bedleveling/beacon/' },
          { label: 'Cartographer', href: '/bedleveling/cartographer/' },
          { label: 'Eddy', href: '/bedleveling/eddy/' },
          { label: 'Eddy Coil', href: '/bedleveling/eddy-coil/' },
        ],
      },
      {
        label: 'Multi-Material',
        items: [
          { label: 'How to choose', href: '/MMUs/' },
          { label: 'ERCF v1/v2', href: '/MMUs/ERCF/' },
          { label: 'BoxTurtle', href: '/MMUs/BoxTurtle/' },
          { label: 'Tradrack', href: '/MMUs/tradrack/' },
          { label: 'PICO-MMU', href: '/MMUs/PICO-MMU/' },
          { label: 'BTT-MMU', href: '/MMUs/BTT-MMU/' },
          { label: 'Anycubic-MMU', href: '/MMUs/Anycubic-MMU/' },
          { label: 'Prusa-MMU', href: '/MMUs/Pursa-MMU/' },
        ],
      },
    ],
  },

  {
    // The old "Guides" tab was a single page of outbound links occupying a
    // top-level slot. It belongs with the tuning content.
    label: 'Software & Tuning',
    blurb: 'Configure it and dial it in.',
    items: [
      { label: 'Overview', href: '/software/' },
      { label: 'Klipper', href: '/software/klipper/' },
      { label: 'Klipper Config Help', href: '/software/klipper-config-help/' },
      { label: 'Klipper Macros', href: '/software/klipper-macros/' },
      { label: 'Shake&Tune', href: '/software/shakeAndtune/' },
      { label: 'Print tuning guides', href: '/guides/' },
    ],
  },

  {
    label: 'Filament',
    blurb: 'Choose what to feed it.',
    items: [
      { label: 'Overview', href: '/filament/' },
      { label: 'Filament Guide', href: '/filament/filament-guide/' },
    ],
  },
];

/** Trailing-slash-insensitive comparison, so `/printers` matches `/printers/`. */
const norm = (p) => '/' + String(p ?? '').replace(/^\/+|\/+$/g, '');

export function isSamePage(a, b) {
  return norm(a) === norm(b);
}

/** Every link in a subtree, depth-first — the order they read on screen. */
export function flatten(items) {
  const out = [];
  for (const item of items ?? []) {
    if (item.href) out.push(item);
    if (item.items) out.push(...flatten(item.items));
  }
  return out;
}

/** Every link on the site, in reading order. Backs prev/next. */
export function allLinks() {
  return flatten(NAV);
}

function contains(items, pathname) {
  return flatten(items).some((link) => isSamePage(link.href, pathname));
}

/** The top-level section a path belongs to, or null (home, policies, 404). */
export function sectionFor(pathname) {
  return NAV.find((section) => contains(section.items, pathname)) ?? null;
}

/** The section chips, with the current one marked.
 *
 *  A section's own href is its first direct link — by convention the section
 *  overview ("Choosing a printer", "How to choose"), which is the right landing
 *  page. Falls back to the first link at any depth so a chip is never dead. */
export function sections(pathname) {
  const current = sectionFor(pathname);
  return NAV.map((section) => {
    const direct = section.items.find((item) => item.href);
    const href = direct?.href ?? flatten(section.items)[0]?.href ?? null;
    return {
      label: section.label,
      blurb: section.blurb,
      href,
      isCurrent: section === current,
    };
  }).filter((section) => section.href);
}

/** Mark the current link and expand only the groups on the path to it.
 *
 *  Collapsing the rest is what keeps the sidebar to about a screenful. The
 *  ancestors of the current page stay open so you can always see where you are
 *  without clicking anything. */
export function markTree(items, pathname) {
  return (items ?? []).map((item) => {
    if (item.href) {
      return { ...item, isCurrent: isSamePage(item.href, pathname) };
    }
    const children = markTree(item.items, pathname);
    return {
      ...item,
      items: children,
      // Open a group when the current page is somewhere inside it.
      isOpen: contains(item.items, pathname),
    };
  });
}

/** The sidebar body: the current section's own entries.
 *
 *  Outside any section — home, policies — there is no section to show, so the
 *  sidebar renders the section list on its own instead of dumping all ~100
 *  links, which is what the old fallback did. */
export function sidebarFor(pathname) {
  const section = sectionFor(pathname);
  if (!section) return null;
  return { label: section.label, items: markTree(section.items, pathname) };
}

/** Previous and next page, in reading order across the whole site. */
export function siblingsFor(pathname) {
  const links = allLinks();
  const i = links.findIndex((link) => isSamePage(link.href, pathname));
  if (i === -1) return { prev: null, next: null };
  return { prev: links[i - 1] ?? null, next: links[i + 1] ?? null };
}

/** Trail from section root to the current page, for breadcrumbs on mobile. */
export function breadcrumbsFor(pathname) {
  const section = sectionFor(pathname);
  if (!section) return [];

  const trail = [];
  const walk = (items, ancestors) => {
    for (const item of items ?? []) {
      if (item.href && isSamePage(item.href, pathname)) {
        trail.push(...ancestors, item);
        return true;
      }
      if (item.items && walk(item.items, [...ancestors, item])) return true;
    }
    return false;
  };
  walk(section.items, [{ label: section.label }]);
  return trail;
}
