// Prevent all analytics / beacon scripts from interfering with AliExpress clicks
document.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.includes('aliexpress.com') || href.includes('s.click.aliexpress.com')) {
    // Stop all global click listeners (Google, Cloudflare, etc.)
    e.stopImmediatePropagation();
    e.preventDefault();
    // Open the link directly, bypassing tracking scripts
    window.open(href, '_blank', 'noopener,noreferrer');
  }
}, true);
