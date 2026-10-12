/* Homepage: the race-weekend dispatch sign-up sends to Formspree without leaving the page. */
var dispatch = document.getElementById('dispatch');
var dispatchNote = document.getElementById('dispatch-status');
dispatch.addEventListener('submit', function (e) {
  e.preventDefault();
  var send = dispatch.querySelector('button[type="submit"]');
  send.disabled = true;
  fetch(dispatch.action, { method: 'POST', body: new FormData(dispatch), headers: { Accept: 'application/json' } })
    .then(function (r) {
      if (!r.ok) throw new Error('send failed');
      dispatch.reset();
      dispatchNote.textContent = 'Thank you. You are signed up.';
    })
    .catch(function () {
      dispatchNote.textContent = 'That did not send. Please email maiteland@josh36wood.com.';
    })
    .then(function () { dispatchNote.hidden = false; send.disabled = false; });
});
