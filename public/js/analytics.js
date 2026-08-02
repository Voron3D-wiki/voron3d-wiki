// Custom GA4 events for voron3d.wiki.
//
// The gtag.js library and the base `config` call live in overrides/main.html.
// This file only sends events — it must never call gtag('config', ...) or page
// views get counted twice.
//
// Affiliate clicks are handled here too (previously block-affiliate-tracking.js).
// Keeping both in one capture-phase listener matters: the affiliate handler calls
// stopImmediatePropagation(), so a second listener on the same node would be
// silently skipped depending on load order.
(function () {
  'use strict';

  // Hosts we earn from. Keys are matched against the link hostname, with any
  // leading "www." stripped, either exactly or as a domain suffix.
  var AFFILIATE_VENDORS = {
    'aliexpress.com': 'aliexpress',
    'west3d.com': 'west3d',
    'onetwo3d.co.uk': 'onetwo3d'
  };

  function send(name, params) {
    if (typeof window.gtag !== 'function') return;
    try {
      window.gtag('event', name, params || {});
    } catch (e) {
      /* analytics must never break the page */
    }
  }

  function parse(href) {
    try {
      return new URL(href, window.location.href);
    } catch (e) {
      return null;
    }
  }

  function vendorFor(url) {
    var host = url.hostname.replace(/^www\./, '');
    for (var domain in AFFILIATE_VENDORS) {
      if (host === domain || host.endsWith('.' + domain)) {
        return AFFILIATE_VENDORS[domain];
      }
    }
    return null;
  }

  // Where on the page the link sits. This is the field that tells us whether
  // people buy after reading the guide or straight off a card.
  function placementOf(link) {
    if (link.closest('.md-footer')) return 'site_footer';
    if (link.closest('table')) return 'comparison_table';
    if (link.closest('.grid')) return 'card';
    if (link.closest('details')) return 'disclosure';
    return 'inline';
  }

  // Nearest heading above the link, as a rough "which section sold it" signal.
  function sectionOf(link) {
    var node = link;
    while (node && node !== document.body) {
      var sib = node.previousElementSibling;
      while (sib) {
        if (/^H[1-4]$/.test(sib.tagName)) {
          return (sib.id || sib.textContent.trim()).slice(0, 100);
        }
        sib = sib.previousElementSibling;
      }
      node = node.parentElement;
    }
    return 'unknown';
  }

  // Page slug, e.g. "/printhead/hotends/phaetus-rapido/" -> "phaetus-rapido".
  function productOf() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : 'home';
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var url = parse(link.getAttribute('href'));
    if (!url || !/^https?:$/.test(url.protocol)) return;
    if (url.hostname === window.location.hostname) return;

    var vendor = vendorFor(url);

    if (vendor) {
      send('affiliate_click', {
        vendor: vendor,
        product: productOf(),
        placement: placementOf(link),
        page_section: sectionOf(link)
      });

      // Open the link ourselves so no other click listener (GA, Cloudflare,
      // theme code) can decorate or rewrite the affiliate URL on the way out.
      // Safe from popup blockers: still inside the user gesture.
      e.stopImmediatePropagation();
      e.preventDefault();
      window.open(url.href, '_blank', 'noopener,noreferrer');
      return;
    }

    // Non-affiliate outbound — quantifies where we hand traffic away, and which
    // of those pages we should eventually cover ourselves.
    send('outbound_reference', {
      destination: url.hostname.replace(/^www\./, ''),
      page_section: sectionOf(link)
    });
  }, true);

  document.addEventListener('DOMContentLoaded', function () {
    trackCodeCopy();
    trackEmptySearches();
  });

  // Which Klipper configs people actually take with them.
  function trackCodeCopy() {
    document.addEventListener('click', function (e) {
      var button = e.target.closest('.md-clipboard');
      if (!button) return;
      send('copy_config', { page: productOf() });
    });
  }

  // Searches that return nothing — a direct list of content readers want and
  // we haven't written yet. Debounced so we log intent, not every keystroke.
  function trackEmptySearches() {
    var input = document.querySelector('.md-search__input');
    var list = document.querySelector('.md-search-result__list');
    if (!input || !list || typeof MutationObserver === 'undefined') return;

    var timer = null;
    var lastLogged = '';

    var observer = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var query = input.value.trim();
        if (query.length < 3 || query === lastLogged) return;
        if (list.children.length > 0) return;

        lastLogged = query;
        send('search_no_results', { search_term: query.slice(0, 100) });
      }, 1200);
    });

    observer.observe(list, { childList: true });
  }
})();
