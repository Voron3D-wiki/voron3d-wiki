// Single source of truth for how an outbound link is classified.
//
// Used by both the rehype plugin (which marks links written in markdown) and
// the ExtLink component (which marks links passed as component props, such as
// ProductSpec's buy list). Those two paths do not share a pipeline, so without
// this a buy link rendered by a component would quietly ship with no affiliate
// badge — which is the one badge that must never go missing.

export const AFFILIATE = [
  'aliexpress.com', 'west3d.com', 'onetwo3d.co.uk', 'amzn.to',
  'amazon.com', 'tidd.ly', 'awin1.com', 'collabs.shop',
];

export const OEM = [
  'vorondesign.com', 'voron3d.com', 'bigtreetech.com', 'biqu.equipment',
  'e3d-online.com', 'phaetus.com', 'ldomotors.com', 'mellow.klipper.cn',
  'beacon3d.com', 'cartographer3d.com',
];

export const SOCIAL = ['discord.gg', 'discord.com', 'reddit.com', 'youtube.com', 'youtu.be'];
export const GITHUB = ['github.com', 'raw.githubusercontent.com'];

export const LABELS = {
  affiliate: { text: 'affiliate', sr: 'affiliate link — we may earn a commission' },
  github: { text: 'GitHub', sr: 'link to GitHub' },
  oem: { text: 'OEM', sr: 'manufacturer link' },
  social: { text: 'community', sr: 'community link' },
  external: { text: '', sr: 'external link' },
};

export const ICONS = {
  affiliate: 'M21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9a2 2 0 0 0 2.82 0l7-7a2 2 0 0 0 0-2.84zM6.5 8A1.5 1.5 0 1 1 8 6.5 1.5 1.5 0 0 1 6.5 8z',
  github: 'M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54a3.06 3.06 0 0 0-1.28-1.69c-1.05-.71.08-.7.08-.7a2.42 2.42 0 0 1 1.77 1.19 2.46 2.46 0 0 0 3.35.96 2.46 2.46 0 0 1 .73-1.54c-2.55-.29-5.23-1.28-5.23-5.68a4.45 4.45 0 0 1 1.18-3.08 4.14 4.14 0 0 1 .12-3.04s.96-.31 3.15 1.18a10.85 10.85 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18a4.14 4.14 0 0 1 .12 3.04 4.45 4.45 0 0 1 1.18 3.08c0 4.41-2.69 5.38-5.25 5.67a2.76 2.76 0 0 1 .79 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z',
  oem: 'M12 2L2 7v10l10 5 10-5V7zm0 2.18l7 3.5v.64l-7 3.5-7-3.5v-.64z',
  social: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  external: 'M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14zM5 5h4v2H7v10h10v-2h2v4H5z',
};

export function hostOf(href) {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function matches(hostname, list) {
  return list.some((d) => hostname === d || hostname.endsWith('.' + d));
}

export function classify(hostname) {
  if (matches(hostname, AFFILIATE)) return 'affiliate';
  if (matches(hostname, GITHUB)) return 'github';
  if (matches(hostname, OEM)) return 'oem';
  if (matches(hostname, SOCIAL)) return 'social';
  return 'external';
}

export function relFor(kind) {
  // rel="sponsored" is what Google asks for on paid links.
  return kind === 'affiliate' ? 'sponsored noopener noreferrer' : 'noopener noreferrer';
}
