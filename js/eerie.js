(function () {
  var motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (!motionAllowed) {
    return;
  }

  function scheduleFlicker() {
    var delay = 20000 + Math.random() * 25000;
    setTimeout(function () {
      document.body.classList.add('flicker');
      setTimeout(function () {
        document.body.classList.remove('flicker');
      }, 100 + Math.random() * 80);
      scheduleFlicker();
    }, delay);
  }

  scheduleFlicker();

  var wordmark = document.querySelector('.hero-wordmark');
  if (wordmark) {
    wordmark.setAttribute('data-text', wordmark.textContent);
    setTimeout(function () {
      wordmark.classList.add('ghost');
      setTimeout(function () {
        wordmark.classList.remove('ghost');
      }, 90);
    }, 2900 + Math.random() * 500);
  }
})();
