// Add a copyable anchor to every heading that has an id.
//
// Astro already generates the ids; this only adds the link. Starlight's version
// rendered a visible "Section titled …" affordance beside every heading, which
// on a page with a dozen h2/h3s is a dozen pieces of permanent furniture. Here
// the anchor is a `#` that fades in on hover (see .heading-anchor in
// src/styles/content.css) and is always reachable by keyboard.

import { visit } from 'unist-util-visit';

const HEADINGS = new Set(['h2', 'h3', 'h4', 'h5', 'h6']);

export default function rehypeHeadingAnchors() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!HEADINGS.has(node.tagName)) return;

      const id = node.properties?.id;
      if (!id) return;

      node.children.push({
        type: 'element',
        tagName: 'a',
        properties: {
          className: ['heading-anchor'],
          href: `#${id}`,
          // The heading text is already the accessible name of the section, so
          // the link needs a name of its own that says what it does.
          'aria-label': 'Link to this section',
        },
        children: [{ type: 'text', value: '#' }],
      });
    });
  };
}
