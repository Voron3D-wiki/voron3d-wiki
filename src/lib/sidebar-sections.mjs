// Helpers for splitting Starlight's sidebar into "section bar" + "current
// section only".
//
// Starlight hands each route a fully-built sidebar tree in
// `Astro.locals.starlightRoute.sidebar`. Entries are either
// `{ type: 'link', href, isCurrent }` or `{ type: 'group', label, entries }`.
// Both helpers below walk that tree rather than re-deriving anything from the
// config, so the nav and the sidebar can never disagree about where you are.

/** Does this entry, or anything under it, correspond to the current page? */
export function containsCurrent(entry) {
  if (!entry) return false;
  if (entry.type === 'link') return Boolean(entry.isCurrent);
  if (entry.type === 'group') return (entry.entries ?? []).some(containsCurrent);
  return false;
}

/** Label of the top-level group the current page lives in, or null on pages
 *  outside the sidebar entirely (the home page, policies). */
export function currentSectionLabel(sidebar) {
  const match = (sidebar ?? []).find((entry) => entry.type === 'group' && containsCurrent(entry));
  return match ? match.label : null;
}

/** Where a section's chip should link to.
 *
 *  Prefer the first plain link in the group — by convention that is the
 *  section's own overview ("Choosing a printer", "How to choose"), which is the
 *  right landing page. Fall back to the first link at any depth so a section
 *  chip is never dead. */
export function sectionLinkFor(group) {
  const shallow = (group.entries ?? []).find((e) => e.type === 'link');
  if (shallow) return shallow.href;

  const stack = [...(group.entries ?? [])];
  while (stack.length) {
    const entry = stack.shift();
    if (entry.type === 'link') return entry.href;
    if (entry.type === 'group') stack.push(...(entry.entries ?? []));
  }
  return null;
}

/** The entries to show in the sidebar: just the current section's children.
 *
 *  Outside any section (home, policies) fall back to the whole tree — better a
 *  long menu than an empty one. */
export function currentSectionEntries(sidebar) {
  const match = (sidebar ?? []).find((entry) => entry.type === 'group' && containsCurrent(entry));
  return match ? match.entries : sidebar;
}
