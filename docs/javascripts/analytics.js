// Google Analytics - manual safe version (no outbound tracking)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-7E70MV2KN4', {
  'anonymize_ip': true,
  'transport_type': 'beacon',
  'allow_google_signals': false,
  'send_page_view': true,
});

// Disable GA interference with AliExpress affiliate links
document.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.includes('aliexpress.com') || href.includes('s.click.aliexpress.com')) {
    e.stopPropagation(); // block GA click listeners
    e.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer'); // open cleanly, no redirect
  }
}, true);
