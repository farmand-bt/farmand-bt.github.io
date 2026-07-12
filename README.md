# Farmand Bazdiditehrani — Personal Portfolio

Portfolio site hosted at [farmand-bt.github.io](https://farmand-bt.github.io).
Built with pure HTML, CSS, and minimal vanilla JavaScript — no frameworks, no build step.

## Design

Refined editorial style: [Fraunces](https://fonts.google.com/specimen/Fraunces) display
serif for headings, Inter for body text, warm paper background with a deep violet accent.
Light and dark themes (toggle in the header, persisted in `localStorage`). All design
tokens live at the top of `styles.css` under `:root` (light) and `[data-theme="dark"]`.

## Local preview

Open `index.html` directly in any browser, or use any static file server:

```bash
python -m http.server 8080
# or
npx serve .
```

## Deploy

Push to the `main` branch — GitHub Pages auto-deploys from the repo root.

## Customising content

All content lives in `index.html`. Each section is commented with what to edit.

- **Experience / Education**: copy a `<li class="timeline-item reveal">` block.
- **Projects**: copy an `<article class="project-card reveal">` block. Status badges:
  `status-live`, `status-progress`, `status-research`.
- **Skills**: chips are plain `<span class="chip">` elements. Tool logos come from
  [cdn.simpleicons.org](https://simpleicons.org), rendered as CSS masks filled with the
  theme accent (so they adapt to light/dark); tools without an icon there are text-only
  chips.
- **CV**: replace `assets/CV.pdf` — note the filename is case-sensitive on GitHub Pages.
