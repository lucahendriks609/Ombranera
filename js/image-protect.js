(function () {
  var images = document.querySelectorAll('.confession-image img');
  images.forEach(function (img) {
    img.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
    img.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });
  });
})();
