/* ============================================================
   script.js — Farmand Bazdiditehrani Portfolio

   Four independent blocks:
     1. Theme toggle    (dark ↔ light, persists in localStorage)
     2. Scroll-spy      (highlights the active nav link)
     3. External links  (screen-reader new-tab hint)
     4. Reveal          (fade-in animation on scroll)
     5. Header height   (keeps --header-h equal to the real header)

   Blocks 1 and 3 own text of their own, so they read it through
   window.I18N (see i18n.js) and re-label on 'languagechanged'.
   i18n.js loads first, so window.I18N already exists here — the
   fallbacks only matter if that file fails to load.
   ============================================================ */


/* ============================================================
   1. Theme toggle
   ============================================================ */
(function () {
  var root   = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function label(theme) {
    var key = theme === 'dark' ? 'a11y.themeLight' : 'a11y.themeDark';
    var en  = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    return window.I18N ? window.I18N.t(key, en) : en;
  }

  /*
   * The theme itself is applied before first paint by the inline snippet
   * in <head>; here we only sync the toggle's aria state (the visible
   * icon is chosen by CSS via [data-theme]).
   */
  function applyTheme(theme) {
    root.dataset.theme = theme;
    toggle.setAttribute('aria-label', label(theme));
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function currentTheme() {
    return root.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  applyTheme(currentTheme());

  /* Flip the theme on each click and persist the choice. */
  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* non-fatal */ }
  });

  /* Re-label (not re-theme) when the visitor switches language. */
  document.addEventListener('languagechanged', function () {
    applyTheme(currentTheme());
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
  var EN = ' (opens in new tab)';

  /*
   * Re-runnable by design: switching language re-writes link text, so
   * each hint is created once and then only relabelled. The [data-newtab]
   * marker is what makes finding an existing hint reliable.
   */
  function sync() {
    var text = window.I18N ? window.I18N.t('a11y.newTab', EN) : EN;

    document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
      var hint = a.querySelector('.visually-hidden[data-newtab]');
      if (!hint) {
        hint = document.createElement('span');
        hint.className = 'visually-hidden';
        hint.setAttribute('data-newtab', '');
        a.appendChild(hint);
      }
      hint.textContent = text;
    });
  }

  sync();
  document.addEventListener('languagechanged', sync);
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


/* ============================================================
   5. Header height — keep --header-h equal to the real header

   The header wraps to two rows under 820px and three on the
   narrowest phones, and German labels wrap earlier than English
   ones. A hand-tuned value in CSS therefore always drifts: anchor
   jumps land under the sticky bar and the hero's min-height is off.
   Measuring the element keeps it exact for any language or width.
   CSS still carries per-breakpoint fallbacks for the no-JS case.
   ============================================================ */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var root = document.documentElement;
  var last = 0;

  function sync() {
    var h = Math.round(header.getBoundingClientRect().height);
    /* The guard also stops a measure/apply feedback loop. */
    if (h && h !== last) {
      last = h;
      root.style.setProperty('--header-h', h + 'px');
    }
  }

  sync();

  /*
   * Several independent things change the header's height, so listen for
   * all of them rather than trusting one signal:
   *   - viewport resize      → links wrap onto more or fewer rows
   *   - language swap        → German labels are longer than English
   *   - webfont arrival      → Inter replaces the fallback, widths shift
   *   - anything else        → ResizeObserver, where supported
   */
  window.addEventListener('resize', sync);
  document.addEventListener('languagechanged', sync);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(sync).catch(function () {});
  }

  if (window.ResizeObserver) {
    new ResizeObserver(sync).observe(header);
  }
}());
