/* ============================================================
   script.js — Farmand Bazdiditehrani Portfolio

   Four independent blocks:
     1. Theme toggle    (dark ↔ light, persists in localStorage)
     2. Scroll-spy      (highlights the active nav link)
     3. External links  (screen-reader new-tab hint)
     4. Reveal          (fade-in animation on scroll)
   ============================================================ */


/* ============================================================
   1. Theme toggle
   ============================================================ */
(function () {
  var root   = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  /*
   * The theme itself is applied before first paint by the inline snippet
   * in <head>; here we only sync the toggle's aria state (the visible
   * icon is chosen by CSS via [data-theme]).
   */
  function applyTheme(theme) {
    root.dataset.theme = theme;
    toggle.ariaLabel   = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

  /* Flip the theme on each click and persist the choice. */
  toggle.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}());


/* ============================================================
   2. Scroll-spy — active nav link
   ============================================================ */
(function () {
  var sections = Array.from(document.querySelectorAll('main section[id]'));
  var navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!sections.length || !navLinks.length) return;

  /* Build a map: section id → nav anchor element. */
  var linkMap = {};
  navLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1); /* strip leading # */
    linkMap[id] = a;
  });

  function setActive(id) {
    navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
    if (id && linkMap[id]) linkMap[id].setAttribute('aria-current', 'page');
  }

  /*
   * Scan-line observer: a section is "active" while it crosses a band
   * 40% down the viewport. Unlike a ratio threshold, this works for
   * sections taller than the viewport (Projects, Skills on mobile).
   */
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(function (s) { spy.observe(s); });
}());


/* ============================================================
   3. External links — screen-reader hint for target="_blank"
   ============================================================ */
(function () {
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    var hint = document.createElement('span');
    hint.className = 'visually-hidden';
    hint.textContent = ' (opens in new tab)';
    a.appendChild(hint);
  });
}());


/* ============================================================
   4. Reveal on scroll
   ============================================================ */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /*
   * If the user prefers reduced motion the CSS already makes .reveal
   * elements visible, but we add the class here too so JS-dependent
   * styles stay consistent.
   */
  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); /* animate once, then stop watching */
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}());
