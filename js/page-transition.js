(function () {
  var motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  // Browsers with native support handle the fade themselves via the
  // @view-transition CSS rule; this fallback is only for the rest.
  if (!motionAllowed || 'startViewTransition' in document) {
    return;
  }

  var overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var link = event.target.closest('a[href]');
    if (!link) return;
    if (link.target && link.target !== '_self') return;
    if (link.hasAttribute('download')) return;

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (e) {
      return;
    }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;

    event.preventDefault();
    overlay.classList.add('active');
    setTimeout(function () {
      window.location.href = link.href;
    }, 240);
  });
})();
