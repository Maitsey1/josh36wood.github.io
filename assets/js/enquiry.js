/* Work with Josh: level buttons fill the form, and the enquiry form sends to Formspree. */
document.querySelectorAll('[data-level]').forEach(function (a) {
  a.addEventListener('click', function () {
    document.getElementById('lv').value = a.getAttribute('data-level');
  });
});

var form = document.getElementById('f');
var note = document.getElementById('sent');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var send = form.querySelector('button[type="submit"]');
  send.disabled = true;
  fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
    .then(function (r) {
      if (!r.ok) throw new Error('send failed');
      form.reset();
      note.textContent = 'Sent. Josh\'s management will reply within two working days.';
    })
    .catch(function () {
      note.textContent = 'That did not send. Please email maiteland@josh36wood.com.';
    })
    .then(function () { note.hidden = false; send.disabled = false; });
});
