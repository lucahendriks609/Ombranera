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
        } else {
          statusEl.textContent = errorText;
        }
      })
      .catch(function () {
        statusEl.textContent = errorText;
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
