window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-VPL8R0L9Z1');
document.querySelectorAll('a[href*="aliexpress.com"]').forEach(link => {
  link.addEventListener('click', e => {
    e.stopImmediatePropagation(); // Prevent GTM/GA click listeners
  }, true);
});
