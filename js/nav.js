(function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (navigator.vibrate) {
      navigator.vibrate(8);
    }
  });
})();
