# Action items

Running list of things outstanding on the site. Tick items off as they land;
delete anything that stops being true.

Legend: **[you]** needs something only you can provide · **[claude]** ready to
implement on request · **[decide]** a judgement call, no work until you pick.

---

## Blocked on you

- [ ] **[you]** **Re-export `assets/CV.pdf` (English).** The live download is
      stale: it still shows **GPA 1.4**, the old four-course list, and no
      thesis. Everything on the web page is current — the PDF is the only
      place the old numbers survive. It's a binary export, so it can't be
      patched from here.

- [ ] **[you]** **German CV.** Once it exists, the Download button can serve
      the German file while the page is in German and the English one
      otherwise. Send both PDFs and the filenames you want.
      → **[claude]** wiring is ~10 lines once the file is there.

- [ ] **[you]** **Thesis advisor.** The Education entry is deliberately
      labelled *"Thesis (proposal stage)"* / *"Masterarbeit (Exposé)"* because
      no advisor is assigned and the proposal isn't accepted yet. When that
      changes, the label should become a plain "Thesis:" — otherwise it
      undersells finished work.

- [ ] **[you]** **GPA drifts every semester.** It lives in three places:
      the About paragraph, the Education badge, and the German `edu.msc.badge`
      key in `i18n.js` (as `Note 1,3`). Say the number and all three get
      updated together.

---

## Worth doing soon

- [ ] **[decide]** **German SEO.** German text is injected by JavaScript, so
      Google only ever indexes the English page — the known trade-off of the
      single-page switch we chose. If you want German recruiters to *find* the
      site by German search terms, that needs a real second URL (`/de/`) with
      `hreflang` tags, which means duplicated markup. Fine to leave as-is if
      the site is mainly reached from your CV and LinkedIn.

- [ ] **[you]** **Check `assets/og-image.png`.** It's the preview card shown
      when the link is shared on LinkedIn/Slack, and it was generated in
      July 2026 — before the recent content changes. Worth confirming it
      doesn't show anything now out of date.
      → **[claude]** can regenerate it if it does.

- [ ] **[decide]** **`CV.md` isn't version-controlled.** `.gitignore` contains
      `cv.md`, which on this filesystem also matches `CV.md` — so the source
      document behind the PDF has no history and isn't backed up by the repo.
      Deliberate (it's personal data in a public repo) but worth a conscious
      re-confirm.

- [ ] **[claude]** **`sitemap.xml` + `robots.txt`.** Neither exists. Small,
      standard, helps crawlers. Quick win whenever you want it.

---

## Keep an eye on

- [ ] **Certification expiry.** *Claude Certified Architect* runs out
      **June 2027**; *TASK* runs to 2031. The Credly/Skilljar verification
      links go dead when a badge lapses, so the row should come out or be
      renewed rather than left pointing at a broken page.

- [ ] **"German — B1" in Skills.** Now that the site has a German version, a
      visitor may read that chip against the German copy. Bump it when your
      level does.

- [ ] **Graduation date.** The Contact section promises full-time availability
      from **Summer 2027**. Revisit if the timeline moves.

---

## Notes on how things work

- **Editing English copy:** edit `index.html` directly. English is the source
  of truth; `i18n.js` holds only German overrides and snapshots the English
  out of the page at load, so the two can't drift.
- **Editing German copy:** edit the `DE` object in `i18n.js`. A key with no
  German entry simply stays English — nothing breaks.
- **Adding new text:** give the element `data-i18n="some.key"` and add the
  same key to `DE`.
- **Tests:** `npm test` runs 44 assertions over the language switch
  (`test/i18n.test.mjs`). They also run automatically on every pull request.
- **Nav labels are width-constrained.** The header row is full at the 820px
  container; long German words overflow it. See the note on `nav.experience`
  in `i18n.js` before renaming a nav item.
