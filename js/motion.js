(function () {
  var motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  if (!motionAllowed) {
    return;
  }

  var hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(function () {
      var wordmark = hero.querySelector('.hero-wordmark');
      var tagline = hero.querySelector('.hero-tagline');
      if (wordmark) wordmark.classList.add('visible');
      if (tagline) tagline.classList.add('visible');
    });

    var cursorGlow = hero.querySelector('.hero-cursor-glow');
    if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      hero.addEventListener('mousemove', function (event) {
        var rect = hero.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width) * 100;
        var y = ((event.clientY - rect.top) / rect.height) * 100;
        cursorGlow.style.backgroundPosition = x + '% ' + y + '%';
        cursorGlow.classList.add('active');
      });

      hero.addEventListener('mouseleave', function () {
        cursorGlow.classList.remove('active');
      });
    }
  }

  function revealElement(el) {
    var img = el.querySelector('img');
    if (img && !img.complete) {
      var show = function () {
        el.classList.add('visible');
      };
      img.addEventListener('load', show, { once: true });
      img.addEventListener('error', show, { once: true });
      return;
    }
    el.classList.add('visible');
  }

  var reveals = document.querySelectorAll('.reveal, .reveal-blur');
  if (reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });

    // Safety net: an abrupt scroll jump (End key, scrollbar-track click) can
    // skip an element's viewport-entry frame entirely, leaving it stuck
    // invisible. If the page has scrolled past an element without it ever
    // firing, reveal it once it's above the viewport.
    window.addEventListener(
      'scroll',
      function () {
        reveals.forEach(function (el) {
          if (!el.classList.contains('visible') && el.getBoundingClientRect().bottom < 0) {
            revealElement(el);
          }
        });
      },
      { passive: true }
    );
  }
})();
