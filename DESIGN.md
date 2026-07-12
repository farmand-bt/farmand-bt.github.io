---
name: Farmand Bazdiditehrani — Portfolio
description: Refined editorial CV site — Fraunces display serif, Inter body, deep violet on warm paper, light + dark themes.
colors:
  warm-paper: "#faf9f6"
  pure-surface: "#ffffff"
  parchment-alt: "#f2f0ea"
  ink: "#1c1826"
  ink-soft: "#665f75"
  hairline: "#e6e2d9"
  violet-primary: "#6d28d9"
  violet-deep: "#5b21b6"
  violet-wash: "#ede9fb"
  chip-wash: "#f6f3fc"
  dark-bg: "#131019"
  dark-surface: "#1b1725"
  dark-ink: "#efedf5"
  dark-ink-soft: "#9d95b0"
  dark-hairline: "#2d2739"
  dark-violet-primary: "#a78bfa"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 8vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.375rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  lg: "10px"
  pill: "99px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.violet-primary}"
    textColor: "#ffffff"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1.5rem"
  chip:
    backgroundColor: "{colors.chip-wash}"
    textColor: "{colors.violet-deep}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
  project-card:
    backgroundColor: "{colors.pure-surface}"
    rounded: "{rounded.lg}"
    padding: "2rem"
---

# Design System: Farmand Bazdiditehrani — Portfolio

## 1. Overview

**Creative North Star: "The Quiet Dossier"**

A refined editorial CV: the calm confidence of a well-set academic paper rather than the noise of a developer-portfolio template. One narrow column (820px container), generous section spacing, hairline rules doing the structural work, and a single deep-violet accent carrying every point of emphasis. Typography is the design: an italic-capable display serif (Fraunces) against a neutral working sans (Inter), with an oversized ghosted monogram "F" as the only decorative flourish.

The system explicitly rejects the generic AI-templated portfolio (dark hero, gradient text, icon-card grids) and the cluttered CV dump. Restraint is the differentiator — but restraint with full-contrast ink and committed hierarchy, never timid gray-on-gray.

**Key Characteristics:**
- Warm paper ground with a single violet accent (Restrained color strategy, accent ≤10% of any screen)
- Serif display / sans body pairing; hierarchy carried by size and family, not color
- Hairline rules (1px `hairline`) as the primary structural device: section borders, timeline spine, list rows
- Dual themes (light paper / dark plum-black) with identical structure, toggled and persisted
- Motion is subtle and functional: reveal-on-scroll, hairline underline growth, small hover translations

## 2. Colors

A restrained two-voice palette: warm paper neutrals plus one deep violet, mirrored in a dark plum-black theme.

### Primary
- **Deep Violet** (#6d28d9): the single accent. Section indices, timeline dates and markers, links, hover states, the brand dot. Dark theme lightens it to **Soft Violet** (#a78bfa) to hold contrast on dark ground.
- **Violet Deep** (#5b21b6): hover/pressed shade and chip ink in light theme.
- **Violet Wash** (#ede9fb) / **Chip Wash** (#f6f3fc): tinted fills for badges and chips only — never large surfaces.

### Neutral
- **Warm Paper** (#faf9f6): body background, light theme.
- **Pure Surface** (#ffffff): project cards.
- **Parchment Alt** (#f2f0ea): subtle alternate surface (hover fills).
- **Ink** (#1c1826): headings and primary text — a violet-leaning near-black, not pure black.
- **Ink Soft** (#665f75): secondary text (body prose, metadata).
- **Hairline** (#e6e2d9): every rule, border, and the timeline spine.
- Dark-theme counterparts: bg #131019, surface #1b1725, ink #efedf5, ink-soft #9d95b0, hairline #2d2739.

### Named Rules
**The One Accent Rule.** Violet is the only chromatic voice (status badges excepted: green = live, amber = in progress). If a second accent hue appears anywhere else, it's a bug.
**The Hairline Rule.** Structure is drawn with 1px rules in the hairline color, never with heavy borders, drop shadows at rest, or filled panels.

## 3. Typography

**Display Font:** Fraunces (with Georgia, 'Times New Roman' fallback) — variable optical size, italics used deliberately (surname in hero, ornament glyph).
**Body Font:** Inter (with system-ui fallback).

**Character:** A bookish, warm serif with real personality set against a plain-spoken working sans. The serif signals considered judgment; the sans keeps the data legible. Italic Fraunces is the signature move — used sparingly (hero surname, ghost monogram).

### Hierarchy
- **Display** (500, clamp(2.75rem–4.75rem), 1.04): hero name only.
- **Headline** (500, clamp(1.75rem–2.375rem), 1.15): section headings, paired with a small violet index number and a hairline rule.
- **Title** (500, 1.375rem, 1.3): timeline entry titles, project titles (1.25rem), the About lede, the big Contact email link.
- **Body** (400, 1rem–1.0625rem, 1.65–1.85): Inter prose, always in `ink-soft` with `ink` reserved for emphasis.
- **Label** (600, 0.75–0.8125rem, +0.1–0.18em tracking, uppercase): kickers, dates, group labels, section indices. Violet when it marks time or place; ink-soft when it names a group.

### Named Rules
**The Serif-Means-Content Rule.** Fraunces marks things a human should read slowly (names, titles, the lede, the email). Inter carries everything scanned or skimmed. Never set UI labels in the serif.

## 4. Elevation

Flat by default. Depth exists only as a response to interaction: project cards lift on hover (`translateY(-3px)` + `0 8px 32px rgba(28,24,38,0.07)`), and the sticky header floats on a translucent blurred strip of the page background (`color-mix` 82% bg + 10px backdrop blur). Nothing else casts a shadow. Layering elsewhere is conveyed by hairline rules and surface tints.

### Shadow Vocabulary
- **card-hover** (`box-shadow: 0 8px 32px rgba(28, 24, 38, 0.07)`; dark: `0 8px 32px rgba(0,0,0,0.35)`): project card hover only.

### Named Rules
**The Flat-At-Rest Rule.** No element casts a shadow at rest. Shadow is feedback, not decoration.

## 5. Components

### Buttons
- **Shape:** full pill (99px radius).
- **Primary:** ink-filled with paper text (`ink` bg, 0.625rem × 1.5rem padding); hover swaps to violet with a -1px lift.
- **Outline:** transparent with hairline border, ink text; hover recolors border and text violet.
- **Small (`btn-sm`):** same anatomy at 0.8125rem for card-level actions.

### Chips
- **Style:** pill, chip-wash background, violet-deep text, 0.8125rem/500. Optional 14px leading icon (simple-icons CDN, tinted single violet #8464d8 so icon-less chips still read as one set).
- **State:** static informational tags; hover draws a violet hairline border. Not interactive controls.

### Cards / Containers
- **Corner Style:** 10px radius (project cards only — the sole rounded container in the system).
- **Background:** pure surface on paper; hairline border.
- **Shadow Strategy:** flat at rest, card-hover shadow + lift on hover (see Elevation).
- **Internal Padding:** 2rem; internal stack gap 1rem, date kicker top, tags pushed to bottom with `margin-top: auto`.

### Navigation
- Sticky translucent blurred header, 64px, hairline bottom border. Brand monogram "FB." left (serif, violet dot), links right in Inter 0.875rem/500 ink-soft. Hover/active draws a 1.5px violet underline that scales in from the left; active section tracked by scroll-spy (`aria-current="page"`). Below 540px the links wrap to a second, horizontally scrollable row.

### Timeline (signature component)
- Experience and Education entries hang off a 1px hairline spine with 10px violet-ringed markers (most recent entry filled solid). Each entry: uppercase violet date + muted place/badge line, serif title, muted org, em-dash-bulleted description list. Badges (GPA) are violet-wash pills.

### Hairline rows (signature pattern)
- Certifications and contact channels render as full-width rows separated by hairline rules: name left (ink, 500), metadata right (ink-soft, small); hover nudges the row 0.5rem right and recolors the name violet. Stacks vertically below 540px.

## 6. Do's and Don'ts

### Do:
- **Do** keep violet to small, high-signal moments (dates, indices, links, dots); the page stays paper-and-ink at a glance.
- **Do** draw structure with 1px hairlines (#e6e2d9 / #2d2739) — rules, spines, row separators.
- **Do** verify every foreground/background pair at WCAG 2.1 AA (4.5:1 body) in **both** themes whenever a color changes.
- **Do** keep prose in `ink-soft` at ≥0.9375rem with generous line-height (1.65–1.85), max ~65–75ch.
- **Do** honor `prefers-reduced-motion` for every new animation, and keep reveal-on-scroll content visible-by-default when JS fails.

### Don't:
- **Don't** drift toward the "generic AI-templated portfolio" named in PRODUCT.md: no dark gradient heroes, no `background-clip: text` gradient headlines, no icon-card feature grids.
- **Don't** produce a "cluttered CV dump": no dense bullet walls; every section keeps one clear skim path.
- **Don't** add a second accent hue, colored side-stripes (`border-left` > 1px), or glassmorphism panels (the header blur is the single sanctioned translucency).
- **Don't** set UI labels or metadata in Fraunces; the serif is reserved for content.
- **Don't** add shadows at rest or borders heavier than 1px; if an element needs separation, use a hairline or a surface tint.
