/* ============================================================
   i18n.js — bilingual content layer (English / Deutsch)

   How it works
   ------------
   English is the single source of truth and lives directly in the
   HTML. This file holds ONLY the German overrides. On first run we
   snapshot every translatable slot straight out of the DOM, so the
   English copy can be edited in index.html alone and can never drift
   out of sync with a duplicated dictionary.

   Marking something translatable
   ------------------------------
     <p data-i18n="about.p1">English text</p>
     <ul data-i18n-aria-label="a11y.techUsed" aria-label="Technologies used">

   Then add the matching key to DE below. A key with no German entry
   simply stays English — missing translations degrade, they don't break.

   Values are assigned with innerHTML, so they may contain inline
   markup and must escape a literal ampersand as &amp;.

   Elements that JS appends to (the "opens in new tab" hint) must never
   carry data-i18n themselves — wrap their text in an inner
   <span data-i18n="..."> instead, so the appended node survives a swap.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY  = 'lang';
  var DEFAULT_LANG = 'en';

  /* ----------------------------------------------------------
     German overrides.

     Editorial rule: prose, headings, nav and UI are translated;
     job titles, degree names, course names, project names, thesis
     titles and tech terms deliberately stay English, the way German
     tech CVs and job ads actually read.
     ---------------------------------------------------------- */
  var DE = {

    /* --- Accessibility / UI chrome --- */
    'a11y.skip'        : 'Zum Inhalt springen',
    'a11y.brand'       : 'Farmand Bazdiditehrani — nach oben',
    'a11y.navPrimary'  : 'Hauptnavigation',
    'a11y.themeDark'   : 'Zu dunklem Design wechseln',
    'a11y.themeLight'  : 'Zu hellem Design wechseln',
    'a11y.langGroup'   : 'Sprache',
    'a11y.langEn'      : 'Auf Englisch umschalten',
    'a11y.langDe'      : 'Auf Deutsch umschalten',
    'a11y.newTab'      : ' (öffnet in neuem Tab)',
    'a11y.intro'       : 'Einleitung',
    'a11y.scrollAbout' : 'Zum Abschnitt „Über mich“ scrollen',
    'a11y.techUsed'    : 'Verwendete Technologien',

    /* --- Navigation --- */
    'nav.about'      : 'Über mich',
    'nav.experience' : 'Berufserfahrung',
    'nav.education'  : 'Ausbildung',
    'nav.projects'   : 'Projekte',
    'nav.skills'     : 'Kenntnisse',
    'nav.contact'    : 'Kontakt',

    /* --- Hero --- */
    'hero.kicker'  : 'Data, Analytics &amp; AI · Lüneburg, Deutschland',
    'hero.tagline' : 'M.Sc.-Student Management &amp; Data Science an der Leuphana Universität. ' +
                     'Ich entwickle intelligente Datenprodukte: BI-Dashboards, ETL-Pipelines, ' +
                     'LLM-gestützte Anwendungen und konversationelle KI-Systeme. Mein Ziel sind ' +
                     'Rollen in Data Science, Data Engineering und AI Engineering.',
    'hero.cv'      : 'Lebenslauf herunterladen',
    'hero.email'   : 'E-Mail schreiben',
    'hero.scroll'  : 'Scrollen',

    /* --- About --- */
    'about.heading' : 'Über mich',
    'about.p1' : 'Mein Weg in die Data Science begann mit einem Fundament im ' +
                 'Wirtschaftsingenieurwesen. Während meines B.Sc. an der Iran University of ' +
                 'Science and Technology (Abschluss als 6. von 75 Studierenden) habe ich eine ' +
                 'tiefe Wertschätzung für Systemdenken, Optimierung und quantitative Methoden ' +
                 'entwickelt.',
    'about.p2' : 'Diese Grundlage führte mich zur praktischen Arbeit mit Daten: zunächst als ' +
                 'Project Management Officer in einem Forschungszentrum für Gasturbinen, danach ' +
                 'als BI Junior Specialist bei Pars System Energy, wo ich Power-BI-Dashboards ' +
                 'und SQL-Pipelines aufgebaut habe, die operative Rohdaten in Entscheidungen ' +
                 'verwandelten. Die Nähe zu echten Geschäftsproblemen machte die Lücke zwischen ' +
                 'statischen Reports und intelligenten, adaptiven Systemen unübersehbar.',
    'about.p3' : 'Im Oktober 2024 bin ich nach Deutschland gezogen, um einen M.Sc. in Management ' +
                 '&amp; Data Science an der Leuphana Universität zu absolvieren (aktueller ' +
                 'Notendurchschnitt 1,3) — parallel dazu arbeite ich als Werkstudent im Bereich ' +
                 'Data, Analytics &amp; AI bei der PMI Advisory GmbH. Heute konzentriere ich ' +
                 'mich auf LLM-Pipelines, RAG-Architekturen und die praktische Seite, KI in ' +
                 'Organisationen zu bringen: nicht nur Modelle zu bauen, sondern sie nutzbar zu ' +
                 'machen.',

    /* --- Experience --- */
    'exp.heading' : 'Berufserfahrung',

    'exp.pmi.date'  : 'Sep. 2025 — heute',
    'exp.pmi.place' : 'Hamburg, Deutschland',
    'exp.pmi.b1' : 'Konzeption und Umsetzung datengetriebener Analyse-Frameworks und ' +
                   '-Plattformen, mit denen Portfoliounternehmen Werttreiber quantifizieren und ' +
                   'überwachen können — einschließlich Beiträgen zu Customer Cube 2.0.',
    'exp.pmi.b2' : 'Aufbau und Optimierung skalierbarer Data Pipelines und analytischer ' +
                   'Workflows mit Python, dbt und verwandten Tools sowie Ad-hoc-Analysen zur ' +
                   'Unterstützung von Akquisitionen und Investitionsentscheidungen.',

    'exp.pars.date'  : 'Apr. 2023 — Juli 2024',
    'exp.pars.place' : 'Teheran, Iran',
    'exp.pars.b1' : 'Entwicklung und Pflege von Datenbanken und ETL-Pipelines durch Bereinigung ' +
                    'und Transformation von Daten aus internen Systemen; Aufbau interaktiver ' +
                    'Dashboards zur besseren Nachverfolgung der Geschäftsperformance und zur ' +
                    'Datenvisualisierung.',
    'exp.pars.b2' : 'Überwachung und Steuerung von Projektzeitplänen und Liefergegenständen; ' +
                    'Einführung eines Büroautomatisierungsprozesses, der manuelle ' +
                    'Verwaltungsaufgaben reduziert und die operative Effizienz im gesamten ' +
                    'Unternehmen gesteigert hat.',

    'exp.gtrc.date'  : 'Aug. 2021 — Aug. 2023',
    'exp.gtrc.place' : 'Teheran, Iran',
    'exp.gtrc.b1' : 'Unterstützung des Projektcontrollings durch Nachverfolgung von Fortschritt ' +
                    'und Zeitplänen sowie Sicherstellung der Einhaltung vereinbarter ' +
                    'Liefergegenstände.',
    'exp.gtrc.b2' : 'Erstellung von Dashboards und Durchführung von Kostenanalysen als Grundlage ' +
                    'für datenbasierte Entscheidungen.',

    /* --- Education --- */
    'edu.heading' : 'Ausbildung',

    'edu.msc.date'        : 'Okt. 2024 — heute',
    'edu.msc.badge'       : 'Note 1,3',
    'edu.msc.coursesLabel': 'Relevante Kurse:',
    'edu.msc.thesisLabel' : 'Masterarbeit (Exposé):',
    'edu.msc.thesis'      : '„Learning to Route: Cost-Aware Model Selection for Autonomous ' +
                            'Multi-Step Coding Agents“ — Exposé verfasst; Durchführung ' +
                            'gemeinsam mit der PMI Advisory GmbH.',

    'edu.bsc.badge'       : 'Note 18,76 / 20 (deutsch: 1,4) · Platz 6 von 75',
    'edu.bsc.coursesLabel': 'Relevante Kurse:',
    'edu.bsc.thesisLabel' : 'Bachelorarbeit:',

    'edu.certs' : 'Zertifikate',
    'edu.cert.architect.meta' : 'Juni 2026 – Juni 2027 <span class="cert-arrow" aria-hidden="true">↗</span>',
    'edu.cert.task.meta'      : 'Mai 2026 – Mai 2031 <span class="cert-arrow" aria-hidden="true">↗</span>',
    'edu.cert.action.meta'    : 'Apr. 2026 <span class="cert-arrow" aria-hidden="true">↗</span>',
    'edu.cert.api.meta'       : 'Apr. 2026 <span class="cert-arrow" aria-hidden="true">↗</span>',
    'edu.cert.mcp.meta'       : 'Apr. 2026 <span class="cert-arrow" aria-hidden="true">↗</span>',
    'edu.cert.skills.meta'    : 'Apr. 2026 <span class="cert-arrow" aria-hidden="true">↗</span>',

    /* --- Projects --- */
    'proj.heading'  : 'Projekte',
    'proj.demo'     : 'Live-Demo',
    'proj.research' : 'Forschung',

    'proj.dq.date' : 'Mai 2026',
    'proj.dq.desc' : 'Ein Tool, das mit Large Language Models automatisch ' +
                     'Datenqualitätsprobleme in strukturierten Datensätzen erkennt — ' +
                     'Schema-Inkonsistenzen, Anomalien, Muster fehlender Werte und semantische ' +
                     'Fehler — und daraus verständliche Diagnosen samt Korrekturvorschlägen ' +
                     'erzeugt.',

    'proj.rag.date' : 'April 2026',
    'proj.rag.desc' : 'Ein konversationeller KI-Assistent, der Informationen aus mehreren ' +
                      'heterogenen Quellen (PDFs, Webseiten und strukturierte Daten) über eine ' +
                      'Retrieval-Augmented-Generation-Pipeline (RAG) abruft und zusammenführt. ' +
                      'Deployed auf Streamlit Cloud.',

    'proj.kgqa.date' : 'März 2026',
    'proj.kgqa.desc' : 'Eine hybride NLP-Pipeline, die natürlichsprachliche Fragen über den ' +
                       'DBpedia-Knowledge-Graph beantwortet. Sie verkettet Entity Linking ' +
                       '(DBpedia Spotlight), 1-Hop-Relationsfilterung, LLM-basierte ' +
                       'SPARQL-Generierung (Llama 3.3 70B) und die Live-Ausführung der ' +
                       'Abfragen samt automatischer Wiederholung bei fehlgeschlagenen oder ' +
                       'leeren Ergebnissen. Erreicht 30 % strict / 32 % lenient Accuracy auf ' +
                       '50 LC-QuAD-Benchmark-Fragen. Kursprojekt für Advanced Machine Learning ' +
                       '(WS 2025/26) an der Leuphana Universität.',

    'proj.bayes.date' : 'Juli 2025',
    'proj.bayes.desc' : 'Replikation und Erweiterung von Baio &amp; Blangiardo (2010): ' +
                        'bayessche hierarchische Modelle zur Vorhersage von Fußballergebnissen, ' +
                        'geschätzt mit MCMC (NUTS) auf Daten der italienischen Serie A. Die ' +
                        'Arbeit erweitert das Paper um einen teamspezifischen Heimvorteil und ' +
                        'ein Kovariatenmodell, das den Heimvorteil in Stadionqualität, ' +
                        'Reisedistanz und Ermüdung zerlegt. Kursprojekt für Probabilistic ' +
                        'Modelling an der Leuphana Universität.',

    /* --- Skills --- */
    'skills.heading' : 'Kenntnisse',
    'skills.prog'    : 'Programmiersprachen',
    'skills.ml'      : 'ML &amp; Analyse',
    'skills.ai'      : 'KI &amp; LLMs',
    'skills.bi'      : 'BI &amp; Visualisierung',
    'skills.db'      : 'Datenbanken &amp; Pipelines',
    'skills.cloud'   : 'Cloud &amp; Tools',
    'skills.spoken'  : 'Sprachkenntnisse',
    'skills.persian' : 'Persisch — Muttersprache',
    'skills.english' : 'Englisch — C1',
    'skills.german'  : 'Deutsch — B1',

    'a11y.skills.prog'   : 'Programmiersprachen',
    'a11y.skills.ml'     : 'Machine Learning und Datenanalyse',
    'a11y.skills.ai'     : 'KI- und Large-Language-Model-Tools',
    'a11y.skills.bi'     : 'Business Intelligence und Visualisierung',
    'a11y.skills.db'     : 'Datenbanken und Data-Pipeline-Tools',
    'a11y.skills.cloud'  : 'Cloud-Plattformen und Entwickler-Tools',
    'a11y.skills.spoken' : 'Sprachkenntnisse',

    /* --- Contact --- */
    'contact.heading' : 'Kontakt',
    'contact.intro'   : 'Ich bin ab sofort offen für Forschungskooperationen und Praktika ' +
                        'sowie für Festanstellungen in Data Science, Data Engineering und AI ' +
                        'Engineering nach meinem Abschluss (Sommer 2027). Am schnellsten ' +
                        'erreichen Sie mich hier:',
    'contact.cv'      : 'Lebenslauf herunterladen',

    /* --- Footer --- */
    'footer.top' : 'Nach oben ↑',

    /* --- 404 --- */
    '404.pageTitle' : 'Seite nicht gefunden — Farmand Bazdiditehrani',
    '404.title' : 'Diese Seite existiert nicht.',
    '404.text'  : 'Die Adresse ist möglicherweise falsch geschrieben oder die Seite wurde ' +
                  'verschoben. Alles Sehenswerte finden Sie auf der Startseite.',
    '404.back'  : 'Zurück zur Startseite'
  };


  /* ----------------------------------------------------------
     Slot collection — snapshot the English source from the DOM
     ---------------------------------------------------------- */

  /* Attributes translatable via data-i18n-<attr>. */
  var ATTRS = ['aria-label', 'title'];

  var slots = [];

  function register(el, key, attr) {
    slots.push({
      el   : el,
      key  : key,
      attr : attr || null,
      en   : attr ? el.getAttribute(attr) : el.innerHTML
    });
  }

  function collect() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      register(el, el.getAttribute('data-i18n'), null);
    });
    ATTRS.forEach(function (attr) {
      document.querySelectorAll('[data-i18n-' + attr + ']').forEach(function (el) {
        register(el, el.getAttribute('data-i18n-' + attr), attr);
      });
    });
  }


  /* ----------------------------------------------------------
     Applying a language
     ---------------------------------------------------------- */

  var current = DEFAULT_LANG;

  /*
   * Look up a key for the active language. English falls back to the
   * literal passed in by the caller — script.js uses this for the
   * theme-toggle label, whose text it owns.
   */
  function t(key, fallback) {
    if (current === 'de' && DE[key] != null) return DE[key];
    return fallback;
  }

  function apply(lang) {
    current = lang;

    slots.forEach(function (slot) {
      var value = (lang === 'de' && DE[slot.key] != null) ? DE[slot.key] : slot.en;
      if (slot.attr) slot.el.setAttribute(slot.attr, value);
      else           slot.el.innerHTML = value;
    });

    /* Screen readers pick pronunciation off this. */
    document.documentElement.lang = lang;

    syncButtons(lang);

    /* Lets script.js re-label what it owns: the theme toggle, and the
       "opens in new tab" hints it appends to external links. */
    document.dispatchEvent(new CustomEvent('languagechanged', {
      detail: { lang: lang }
    }));
  }

  function syncButtons(lang) {
    document.querySelectorAll('[data-lang-option]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang-option') === lang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }


  /* ----------------------------------------------------------
     Persistence — English is the default for first-time visitors
     ---------------------------------------------------------- */

  function read() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'de' ? 'de' : DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG; /* private mode / storage blocked */
    }
  }

  function write(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* non-fatal */ }
  }


  /* ----------------------------------------------------------
     Wire up
     ---------------------------------------------------------- */

  collect();
  apply(read());

  document.querySelectorAll('[data-lang-option]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang-option');
      if (lang === current) return;
      apply(lang);
      write(lang);
    });
  });

  /* Public surface for script.js. */
  window.I18N = {
    t    : t,
    lang : function () { return current; }
  };
}());
