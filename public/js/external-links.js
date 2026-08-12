// Open only external links in a new tab
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href]');
  const currentHost = window.location.hostname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

    // Create a temporary URL object to resolve absolute vs relative
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return; // skip invalid URLs
    }

    // Apply only if the hostname differs from the current site
    if (url.hostname && url.hostname !== currentHost) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
