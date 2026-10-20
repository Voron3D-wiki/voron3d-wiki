// `:::note` / `:::tip` / `:::caution` / `:::danger` blocks.
//
// Starlight shipped this syntax and 27 pages already use it, several with a
// custom title (`:::tip[Best Practices]`), so the authoring syntax has to
// survive the layout rewrite untouched — the markdown is the asset here, not
// the renderer.
//
// remark-directive does the parsing; this turns the resulting containerDirective
// into plain semantic HTML. The rendering deliberately differs from Starlight's:
// a left rule and a small label rather than a filled, rounded, tinted box. Four
// of those stacked in a page is most of what read as clutter.

import { visit } from 'unist-util-visit';

const TYPES = {
  note: { label: 'Note' },
  tip: { label: 'Tip' },
  caution: { label: 'Caution' },
  danger: { label: 'Danger' },
  // Accepted as aliases so authors coming from other stacks are not corrected.
  warning: { label: 'Caution', as: 'caution' },
  important: { label: 'Note', as: 'note' },
};

/** The `[Custom title]` part of `:::tip[Custom title]`.
 *
 *  remark-directive parses it as a paragraph child carrying
 *  `data.directiveLabel`. It has to be spliced out of the body, or the title
 *  renders twice. */
function takeLabel(node) {
  const first = node.children?.[0];
  if (first?.type === 'paragraph' && first.data?.directiveLabel) {
    node.children.shift();
    return first.children;
  }
  return null;
}

export default function remarkAsides() {
  return (tree, file) => {
    visit(tree, 'containerDirective', (node) => {
      const spec = TYPES[node.name];
      if (!spec) return;

      const type = spec.as ?? node.name;
      const custom = takeLabel(node);

      // A named type with no icon and no fill needs its label to carry the
      // meaning, so the label is always rendered — never icon-only.
      const title = {
        type: 'paragraph',
        data: { hName: 'p', hProperties: { className: ['aside__title'] } },
        children: custom ?? [{ type: 'text', value: spec.label }],
      };

      node.data = {
        hName: 'aside',
        hProperties: {
          className: ['aside', `aside--${type}`],
          'aria-label': custom ? undefined : spec.label,
        },
      };

      node.children = [
        title,
        {
          type: 'paragraph',
          data: { hName: 'div', hProperties: { className: ['aside__body'] } },
          children: node.children,
        },
      ];
    });

    // A `:::something` that matches no type would otherwise vanish silently,
    // taking its content with it. Leave the content in place and say so.
    visit(tree, 'containerDirective', (node) => {
      if (TYPES[node.name]) return;
      console.warn(
        `[asides] unknown directive ":::${node.name}" in ${file?.path ?? 'unknown file'} — rendered as a plain block.`
      );
      node.data = { hName: 'div' };
    });
  };
}
