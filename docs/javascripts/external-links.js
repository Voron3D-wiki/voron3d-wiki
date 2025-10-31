document.addEventListener("DOMContentLoaded", function() {
  // Select all links
  const links = document.querySelectorAll('a[href^="http"]');

  links.forEach(link => {
    const host = window.location.host;
    // If link host differs from current site, open in new tab
    if (!link.href.includes(host)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});
