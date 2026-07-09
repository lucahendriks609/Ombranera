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
  }

  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
