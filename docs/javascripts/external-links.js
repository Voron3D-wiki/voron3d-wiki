// Make all external links open in a new tab safely
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const url = link.getAttribute('href');
    // skip mailto:, anchors, and same-site links
    if (
      url &&
      !url.startsWith('#') &&
      !url.startsWith('mailto:') &&
      !url.startsWith(window.location.origin) &&
      !url.startsWith('/')
    ) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
