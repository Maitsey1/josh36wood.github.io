/* Gallery: filter chips and the photo viewer. Photos, captions and categories live in gallery.html. */
var chips = document.getElementById('chips');
var wall = document.getElementById('wall');
var photos = Array.prototype.slice.call(wall.querySelectorAll('.ph'));
var current = 'all', visible = [], idx = 0, opener = null;

/* Counts on the chips follow the photos in the page */
chips.querySelectorAll('.chip').forEach(function (b) {
  var cat = b.dataset.cat;
  var n = cat === 'all' ? photos.length : photos.filter(function (f) { return f.dataset.cat === cat; }).length;
  b.querySelector('span').textContent = n;
  b.addEventListener('click', function () { setFilter(cat); });
});

function setFilter(cat) {
  current = cat;
  chips.querySelectorAll('.chip').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.cat === cat ? 'true' : 'false'); });
  photos.forEach(function (f) { f.hidden = !(cat === 'all' || f.dataset.cat === cat); });
}

var lb = document.getElementById('lb');
var lbImg = document.getElementById('lbImg');
var lbCap = document.getElementById('lbCap');
var lbCount = document.getElementById('lbCount');

function data(f) {
  var img = f.querySelector('img');
  return { src: img.getAttribute('src'), alt: img.getAttribute('alt'), title: f.querySelector('figcaption b').textContent, sub: f.querySelector('figcaption span').textContent };
}
function show() {
  var p = data(photos[visible[idx]]);
  lbImg.src = p.src; lbImg.alt = p.alt;
  lbCap.innerHTML = '';
  var b = document.createElement('b'); b.textContent = p.title;
  var s = document.createElement('span'); s.textContent = p.sub;
  lbCap.appendChild(b); lbCap.appendChild(s);
  lbCount.textContent = (idx + 1) + ' / ' + visible.length;
}
function open(i, from) {
  visible = photos.map(function (f, k) { return k; }).filter(function (k) { return current === 'all' || photos[k].dataset.cat === current; });
  idx = Math.max(0, visible.indexOf(i));
  opener = from; show(); lb.hidden = false;
  document.getElementById('lbClose').focus();
}
function close() { lb.hidden = true; if (opener) opener.focus(); }
function step(d) { idx = (idx + d + visible.length) % visible.length; show(); }

photos.forEach(function (f, i) {
  var btn = f.querySelector('button');
  btn.addEventListener('click', function () { open(i, btn); });
});
document.getElementById('lbClose').addEventListener('click', close);
document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
document.getElementById('lbNext').addEventListener('click', function () { step(1); });
lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-stage')) close(); });
document.addEventListener('keydown', function (e) {
  if (lb.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});
var sx = null;
lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', function (e) {
  if (sx === null) return;
  var dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  sx = null;
});
