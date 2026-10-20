// Wrap tables in a horizontally scrollable container.
//
// The obvious fix for wide tables is `table { display: block; overflow-x: auto }`,
// and it is wrong: `display: block` stops the element being a table, so column
// widths collapse to fit content and the table no longer fills the page. That is
// what made these look shrunken and misaligned.
//
// Wrapping instead keeps `display: table` intact — the table lays out normally
// and the *wrapper* scrolls, only when it actually needs to.

import { visit } from 'unist-util-visit';

export default function rehypeTableWrap() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null) return;
      if (parent.type === 'element' && parent.properties?.className?.includes?.('table-scroll')) return;

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-scroll'],
          // Keyboard users need to be able to scroll it too.
          tabindex: '0',
          role: 'region',
          'aria-label': 'Scrollable table',
        },
        children: [node],
      };
    });
  };
}
