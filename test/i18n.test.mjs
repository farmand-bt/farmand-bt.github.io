/* Functional test of the EN/DE switch, run against the real files in a
   jsdom DOM. Exercises: default language, toggle, persistence across a
   reload, round-trip back to English, and the two JS-owned labels. */

import { JSDOM, VirtualConsole } from 'jsdom';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/* Resolve the site root relative to this file, so the suite runs
   from any checkout (and in CI) without absolute paths. */
const ROOT = fileURLToPath(new URL('..', import.meta.url));

let pass = 0;
let fail = 0;

function check(name, actual, expected) {
  const ok = actual === expected;
  if (ok) { pass++; console.log(`  PASS  ${name}`); }
  else {
    fail++;
    console.log(`  FAIL  ${name}`);
    console.log(`          expected: ${JSON.stringify(expected)}`);
    console.log(`          actual:   ${JSON.stringify(actual)}`);
  }
}

function checkIncludes(name, haystack, needle) {
  const ok = typeof haystack === 'string' && haystack.includes(needle);
  if (ok) { pass++; console.log(`  PASS  ${name}`); }
  else {
    fail++;
    console.log(`  FAIL  ${name}`);
    console.log(`          "${needle}" not found in: ${JSON.stringify(String(haystack).slice(0, 120))}`);
  }
}

/* A localStorage that survives "reloads", like a real browser's. */
function makeStorage(seed = {}) {
  const data = { ...seed };
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: (k) => { delete data[k]; },
    clear: () => { for (const k in data) delete data[k]; },
    _data: data
  };
}

function load(file, storage) {
  const html = readFileSync(ROOT + file, 'utf8');
  const vc = new VirtualConsole();
  const errors = [];
  vc.on('jsdomError', (e) => errors.push(e.message));

  const dom = new JSDOM(html, {
    runScripts: 'outside-only',
    url: 'https://farmand-bt.github.io/',
    virtualConsole: vc
  });
  const { window } = dom;

  Object.defineProperty(window, 'localStorage', { value: storage, configurable: true });
  window.matchMedia = () => ({ matches: false, addEventListener() {}, addListener() {} });
  window.IntersectionObserver = class {
    observe() {} unobserve() {} disconnect() {}
  };

  /* Re-run the inline pre-paint snippet, which jsdom skipped. */
  const inline = window.document.querySelector('head script:not([src])');
  if (inline) window.eval(inline.textContent);

  window.eval(readFileSync(ROOT + 'i18n.js', 'utf8'));
  if (file === 'index.html') {
    window.eval(readFileSync(ROOT + 'script.js', 'utf8'));
  }
  return { window, errors };
}

const $ = (w, sel) => w.document.querySelector(sel);

console.log('\n=== 1. First visit: defaults to English ===');
{
  const store = makeStorage();
  const { window: w, errors } = load('index.html', store);
  check('no script errors', errors.length, 0);
  check('html lang', w.document.documentElement.lang, 'en');
  check('nav About', $(w, 'a[href="#about"]').textContent, 'About');
  check('EN button pressed', $(w, '[data-lang-option="en"]').getAttribute('aria-pressed'), 'true');
  check('DE button not pressed', $(w, '[data-lang-option="de"]').getAttribute('aria-pressed'), 'false');
  check('nothing persisted yet', store.getItem('lang'), null);
  checkIncludes('theme toggle label EN', $(w, '#theme-toggle').getAttribute('aria-label'), 'Switch to dark theme');
  checkIncludes('new-tab hint EN', $(w, 'a[target="_blank"] [data-newtab]').textContent, 'opens in new tab');
}

console.log('\n=== 2. Clicking DE switches the page ===');
let sharedStore;
{
  const store = makeStorage();
  sharedStore = store;
  const { window: w } = load('index.html', store);
  $(w, '[data-lang-option="de"]').dispatchEvent(new w.Event('click', { bubbles: true }));

  check('html lang', w.document.documentElement.lang, 'de');
  check('nav About', $(w, 'a[href="#about"]').textContent, 'Über mich');
  check('nav Experience', $(w, 'a[href="#experience"]').textContent, 'Berufserfahrung');
  check('Experience heading', $(w, '#experience-heading').textContent, 'Berufserfahrung');
  /* The switch is flag-only; nothing should re-introduce a text label. */
  check('no text label on switch', w.document.querySelectorAll('.lang-code').length, 0);
  check('section heading', $(w, '#about-heading').textContent, 'Über mich');
  check('GPA badge localised', $(w, '#education .timeline-badge').textContent, 'Note 1,3');
  check('thesis label', $(w, '[data-i18n="edu.msc.thesisLabel"]').textContent, 'Masterarbeit (Exposé):');
  check('DE button pressed', $(w, '[data-lang-option="de"]').getAttribute('aria-pressed'), 'true');
  check('EN button released', $(w, '[data-lang-option="en"]').getAttribute('aria-pressed'), 'false');
  check('choice persisted', store.getItem('lang'), 'de');

  checkIncludes('hero tagline DE', $(w, '.home-tagline').textContent, 'Ich entwickle intelligente Datenprodukte');
  checkIncludes('about p3 DE', $(w, '[data-i18n="about.p3"]').textContent, 'Notendurchschnitt 1,3');
  check('ampersand rendered, not escaped',
    $(w, '[data-i18n="skills.ml"]').textContent, 'ML & Analyse');

  /* Things that must NOT be translated. */
  check('job title stays EN', $(w, '#experience .timeline-title').textContent,
    'Working Student, Data, Analytics & AI');
  check('degree stays EN', $(w, '#education .timeline-title').textContent,
    'M.Sc. Management & Data Science');
  checkIncludes('thesis title stays EN', $(w, '[data-i18n="edu.msc.thesis"]').textContent,
    'Learning to Route: Cost-Aware Model Selection');

  /* JS-owned labels follow the language. */
  checkIncludes('theme toggle label DE', $(w, '#theme-toggle').getAttribute('aria-label'),
    'Zu dunklem Design wechseln');
  checkIncludes('new-tab hint DE', $(w, 'a[target="_blank"] [data-newtab]').textContent,
    'öffnet in neuem Tab');

  /* The hint must survive a text swap, exactly once per link. */
  const demo = [...w.document.querySelectorAll('a[target="_blank"]')]
    .find((a) => a.textContent.includes('Live-Demo'));
  check('Live Demo translated', !!demo, true);
  check('exactly one hint on that link', demo.querySelectorAll('[data-newtab]').length, 1);
}

console.log('\n=== 3. Reload keeps German ===');
{
  const { window: w } = load('index.html', sharedStore);
  check('html lang after reload', w.document.documentElement.lang, 'de');
  check('nav still German', $(w, 'a[href="#about"]').textContent, 'Über mich');
  check('DE button still pressed', $(w, '[data-lang-option="de"]').getAttribute('aria-pressed'), 'true');
  checkIncludes('theme label German on load', $(w, '#theme-toggle').getAttribute('aria-label'),
    'Zu dunklem Design wechseln');
}

console.log('\n=== 4. Switching back restores the English source exactly ===');
{
  const store = makeStorage();
  const { window: w } = load('index.html', store);

  const before = new Map();
  w.document.querySelectorAll('[data-i18n]').forEach((el, i) => before.set(i, el.innerHTML));

  $(w, '[data-lang-option="de"]').dispatchEvent(new w.Event('click', { bubbles: true }));
  $(w, '[data-lang-option="en"]').dispatchEvent(new w.Event('click', { bubbles: true }));

  let drift = 0;
  w.document.querySelectorAll('[data-i18n]').forEach((el, i) => {
    if (el.innerHTML !== before.get(i)) { drift++; }
  });
  check('round-trip leaves every slot byte-identical', drift, 0);
  check('lang back to en', w.document.documentElement.lang, 'en');
  check('persisted back to en', store.getItem('lang'), 'en');
  checkIncludes('new-tab hint back to EN', $(w, 'a[target="_blank"] [data-newtab]').textContent,
    'opens in new tab');
}

console.log('\n=== 5. 404 page follows the saved language ===');
{
  const { window: w, errors } = load('404.html', makeStorage({ lang: 'de' }));
  check('no script errors', errors.length, 0);
  check('html lang', w.document.documentElement.lang, 'de');
  check('heading', $(w, '.nf-title').textContent, 'Diese Seite existiert nicht.');
  check('back link', $(w, '.btn').textContent, 'Zurück zur Startseite');
  check('title tag', w.document.title, 'Seite nicht gefunden — Farmand Bazdiditehrani');
}
{
  const { window: w } = load('404.html', makeStorage());
  check('defaults to English', $(w, '.nf-title').textContent, "This page doesn't exist.");
}

console.log('\n=== 6. Storage blocked (private mode) degrades to English ===');
{
  const blocked = {
    getItem() { throw new Error('denied'); },
    setItem() { throw new Error('denied'); }
  };
  const { window: w, errors } = load('index.html', blocked);
  check('no uncaught errors', errors.length, 0);
  check('falls back to English', $(w, 'a[href="#about"]').textContent, 'About');
}

console.log(`\n${'='.repeat(46)}`);
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
