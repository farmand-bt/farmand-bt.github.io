/* ============================================================
   script.js — Farmand Bazdiditehrani Portfolio

   Three independent blocks:
     1. Theme toggle  (dark ↔ light, persists in localStorage)
     2. Scroll-spy    (highlights the active nav link)
     3. Reveal        (fade-in animation on scroll)
   ============================================================ */


/* ============================================================
   1. Theme toggle
   ============================================================ */
(function () {
  var root   = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  /* Read saved preference, or fall back to the OS preference. */
  function getInitialTheme() {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /* Apply a theme: update the data attribute, button icon, and aria state. */
  function applyTheme(theme) {
    root.dataset.theme    = theme;
    toggle.textContent    = theme === 'dark' ? '☀' : '🌙';
    toggle.ariaLabel      = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  /* Set the theme on page load — before first paint where possible. */
  applyTheme(getInitialTheme());

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
   * Threshold 0.35: the link updates once about a third of the section
   * is in view — feels natural without being jumpy at section boundaries.
   */
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { threshold: 0.35 });

  sections.forEach(function (s) { spy.observe(s); });
}());


/* ============================================================
   3. Reveal on scroll
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
