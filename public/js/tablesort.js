// Click-to-sort table headers.
//
// Replaces the old tablesort.js, which depended on Material's `document$`
// observable and a CDN copy of the tablesort library. This is self-contained:
// no dependency, no third-party script, and it understands the values that
// actually appear in these tables — plain numbers, and specs like "24V",
// "1.8°", "300mm", "2.5 A".
(function () {
  'use strict';

  // Pull the leading number out of a cell so "24V" and "1.8°" sort numerically.
  // Returns null when the cell is not numeric, so those columns sort as text.
  function numeric(value) {
    var m = value.trim().replace(/,/g, '').match(/^[^\d\-+.]*([-+]?\d*\.?\d+)/);
    return m ? parseFloat(m[1]) : null;
  }

  function cellText(row, index) {
    var cell = row.children[index];
    return cell ? cell.textContent.trim() : '';
  }

  function sortBy(table, index, ascending) {
    var body = table.tBodies[0];
    if (!body) return;

    var rows = Array.prototype.slice.call(body.rows);
    var allNumeric = rows.every(function (r) {
      var t = cellText(r, index);
      return t === '' || numeric(t) !== null;
    });

    rows.sort(function (a, b) {
      var x = cellText(a, index);
      var y = cellText(b, index);

      // Empty cells always sort last, whichever direction we are going.
      if (x === '' || y === '') return x === y ? 0 : x === '' ? 1 : -1;

      var result = allNumeric
        ? numeric(x) - numeric(y)
        : x.localeCompare(y, undefined, { numeric: true, sensitivity: 'base' });

      return ascending ? result : -result;
    });

    rows.forEach(function (r) { body.appendChild(r); });
  }

  function enhance(table) {
    if (table.dataset.sortable === 'true') return;
    var head = table.tHead;
    if (!head || !head.rows.length || !table.tBodies.length) return;
    table.dataset.sortable = 'true';

    Array.prototype.forEach.call(head.rows[0].cells, function (th, index) {
      th.style.cursor = 'pointer';
      th.setAttribute('role', 'button');
      th.setAttribute('tabindex', '0');
      th.title = 'Sort by ' + th.textContent.trim();

      function toggle() {
        var ascending = th.dataset.sorted !== 'asc';

        Array.prototype.forEach.call(head.rows[0].cells, function (other) {
          delete other.dataset.sorted;
          other.removeAttribute('aria-sort');
        });

        th.dataset.sorted = ascending ? 'asc' : 'desc';
        th.setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
        sortBy(table, index, ascending);
      }

      th.addEventListener('click', toggle);
      th.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  }

  function init() {
    document.querySelectorAll('.prose table').forEach(enhance);
  }

  document.addEventListener('DOMContentLoaded', init);
  // Astro swaps the document on client-side navigation; re-run for the new page.
  document.addEventListener('astro:page-load', init);
})();
