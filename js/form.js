(function () {
  var form = document.getElementById('inner-form');
  if (!form) return;

  var statusEl = document.getElementById('form-status');
  var button = form.querySelector('button');
  var successText = statusEl.getAttribute('data-success') || 'Request received.';
  var errorText = statusEl.getAttribute('data-error') || 'Something went wrong. Try again.';

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    button.disabled = true;
    statusEl.textContent = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json'
      }
    })
      .then(function (response) {
        if (response.ok) {
          statusEl.textContent = successText;
          form.reset();
          if (navigator.vibrate) {
            navigator.vibrate(15);
          }
        } else {
          statusEl.textContent = errorText;
          if (navigator.vibrate) {
            navigator.vibrate([10, 40, 10]);
          }
        }
      })
      .catch(function () {
        statusEl.textContent = errorText;
        if (navigator.vibrate) {
          navigator.vibrate([10, 40, 10]);
        }
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
