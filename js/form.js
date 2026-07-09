(function () {
  var form = document.getElementById('inner-form');
  if (!form) return;

  var statusEl = document.getElementById('form-status');
  var button = form.querySelector('button');

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
          statusEl.textContent = 'Request received.';
          form.reset();
        } else {
          statusEl.textContent = 'Something went wrong. Try again.';
        }
      })
      .catch(function () {
        statusEl.textContent = 'Something went wrong. Try again.';
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
