/* Cookie consent. Google Analytics loads only after Accept. */
(function () {
  var GA_ID = "G-56M0RX694E";
  var KEY = "analytics-consent";
  var banner = document.getElementById("consent");

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    window["ga-disable-" + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  function clearCookies() {
    window["ga-disable-" + GA_ID] = true;
    var names = ["_ga", "_ga_" + GA_ID.replace("G-", "")];
    var host = location.hostname.split(".");
    var domains = ["", location.hostname];
    if (host.length > 2) domains.push(host.slice(-2).join("."));
    else domains.push("." + location.hostname);
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : "");
      });
    });
  }

  function show() { if (banner) { banner.hidden = false; var b = banner.querySelector("button"); if (b) b.focus(); } }
  function hide() { if (banner) banner.hidden = true; }

  function choose(v) {
    var previous = read();
    write(v);
    hide();
    if (v === "granted") loadAnalytics();
    else {
      clearCookies();
      if (previous === "granted") location.reload();
    }
  }

  if (banner) {
    banner.addEventListener("click", function (e) {
      var v = e.target && e.target.getAttribute("data-consent");
      if (v) choose(v);
    });
  }
  document.addEventListener("click", function (e) {
    if (e.target && e.target.hasAttribute("data-cookie-settings")) show();
  });

  var saved = read();
  if (saved === "granted") loadAnalytics();
  else if (saved !== "denied") show();
})();
