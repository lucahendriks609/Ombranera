(function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (navigator.vibrate) {
        navigator.vibrate(8);
      }
    });
  }

  var langTrigger = document.getElementById('lang-trigger');
  var langMenu = document.getElementById('lang-menu');
  if (langTrigger && langMenu) {
    var closeLangMenu = function () {
      langMenu.classList.remove('open');
      langTrigger.setAttribute('aria-expanded', 'false');
    };

    langTrigger.addEventListener('click', function (event) {
      event.stopPropagation();
      var isOpen = langMenu.classList.toggle('open');
      langTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (navigator.vibrate) {
        navigator.vibrate(8);
      }
    });

    document.addEventListener('click', function (event) {
      if (!langMenu.classList.contains('open')) return;
      if (langMenu.contains(event.target) || langTrigger.contains(event.target)) return;
      closeLangMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeLangMenu();
    });
  }
})();
