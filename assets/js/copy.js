/* Media kit: Copy buttons. */
document.querySelectorAll('.copy').forEach(function (b) {
  b.addEventListener('click', function () {
    var el = document.getElementById(b.getAttribute('data-copy'));
    var text = el.innerText.trim();
    var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1600); };
    var fallback = function () { var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selected'; };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
  });
});
