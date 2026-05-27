# P78 — Website v1 Build Plan

The reference design is in `p78-homepage.html` (single-file HTML artifact). Rebuild it as a proper Astro project per the rules below.

---

## Stack

- **Framework:** Astro (static site output)
- **Styling:** Plain CSS with CSS custom properties (design tokens). No Tailwind, no CSS framework.
- **Animation:** CSS for simple stuff. Add GSAP later when motion gets more involved (scroll-pinned hero, video scrub, etc.). Don't install GSAP up front.
- **Hosting:** Netlify (free tier). Deploys on `git push` to main.
- **Forms:** Netlify Forms (free, built-in) for the partner/contact form.
- **Repo:** GitHub. Netlify connects to the repo for auto-deploy.
- **Domain:** `p78space.com` — point at Netlify when ready to go live.

---

## Site structure

Single scrolling homepage. No subpages in v1.

Sections, in order:

1. **Nav** — wordmark left, links right. Links: Mission, Products, Careers, Partner with us. All anchor links to sections on the page.
2. **Hero** — full-bleed image, eyebrow, headline, sub, two CTAs, stat band along the bottom.
3. **Mission** — thesis statement + two-column "Why P78" prose + "What we do" numbered triad (Connect / Service / Reach).
4. **Products** — two product blocks (01 Propulsion, 02 Vehicle). Each: number, name, status tag, body copy, spec chips, key/value spec table, "read brief" link.
5. **Careers** — short intro + 4 role rows (Propulsion Intern, Propellant Intern, Propulsion Engineer, Open Application). Each row links to a Notion page (URLs to be added later — leave `href="#"` placeholders).
6. **Partner** — closing dark CTA band with contact form (wired to Netlify Forms).
7. **Footer** — wordmark, nav repeat, contact, social, legal.

---

## Architecture rules — **read these carefully, follow strictly**

These rules are what make the site scalable, maintainable, and fast to iterate on. Breaking them creates drift that's painful to clean up later.

### 1. Every section is its own component

```
src/
  components/
    Nav.astro
    Hero.astro
    Mission.astro
    Products.astro
    ProductBlock.astro    ← reusable, takes props
    Careers.astro
    RoleRow.astro         ← reusable, takes props
    Partner.astro
    Footer.astro
  layouts/
    BaseLayout.astro      ← page shell, global CSS imports, font loading
  styles/
    tokens.css            ← design tokens (single source of truth)
    base.css              ← resets, body defaults, typography base
  pages/
    index.astro           ← composes the components in order
```

### 2. Design tokens are the single source of truth

All colors, fonts, spacing, type sizes live in `src/styles/tokens.css` as CSS custom properties. **No hardcoded values in component files.**

Required tokens (from the P78 brand guidelines):

```css
:root {
  /* Palette — neutral */
  --paper:     #EFF0EB;
  --paper-2:   #E5E7E1;
  --paper-3:   #DCDED7;
  --ink:       #1A1D1C;
  --ink-soft:  #292D2C;
  --faring-200: #DCDED7;
  --faring-300: #C9CFCD;
  --faring-500: #90908D;
  --faring-700: #4D5252;

  /* Palette — accents (defined but used sparingly; build neutral-only first) */
  --mars:      #FF5500;
  --mars-soft: #FB9561;
  --solar:     #D5FF5A;
  --solar-soft:#E2FB97;

  /* Typography */
  --font-display: "Die Grotesk B", "Space Grotesk", Helvetica, Arial, sans-serif;
  --font-body:    "Die Grotesk B", "Space Grotesk", Helvetica, Arial, sans-serif;
  --font-mono:    "Roboto Mono", ui-monospace, Menlo, monospace;

  /* Type scale */
  --fs-display-xl: clamp(38px, 7vw, 98px);
  --fs-display-lg: clamp(28px, 4.4vw, 56px);
  --fs-display-md: clamp(22px, 2.4vw, 32px);
  --fs-body-lg:    clamp(15px, 1.4vw, 18px);
  --fs-body:       clamp(14px, 1.3vw, 16px);
  --fs-mono-sm:    11px;
  --fs-mono-xs:    10.5px;

  /* Spacing scale — use these, never arbitrary px */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  16px;
  --space-4:  24px;
  --space-5:  40px;
  --space-6:  64px;
  --space-7:  96px;
  --space-8:  128px;

  /* Layout */
  --doc-w:     1280px;
  --page-pad:  clamp(20px, 4vw, 52px);
  --rule:      rgba(233, 240, 235, 0.14);
  --rule-light:#DCDED7;

  /* Letter-spacing */
  --tracking-mono: 0.16em;
  --tracking-display: -0.02em;
}
```

### 3. Spacing discipline

Use the spacing scale (`--space-1` through `--space-8`) for **all** padding, margin, and gap values. If a value isn't on the scale, either it should be (add it to tokens), or you should pick the nearest one. **No arbitrary pixel values like `padding: 47px`.** This is the rule that keeps rhythm consistent across the site.

Exception: `clamp()` responsive values are fine inside the token definitions themselves, not in components.

### 4. Page shell controls outer layout

`BaseLayout.astro` defines:
- The page container width (`max-width: var(--doc-w); margin: 0 auto`)
- Side padding (`padding: 0 var(--page-pad)`)
- Font loading (Google Fonts: Space Grotesk + Roboto Mono — until Die Grotesk is licensed)
- Global resets and base typography

Sections inherit this. Sections that need to break out (e.g. full-bleed hero image) handle that *inside* the component, not by overriding the layout.

### 5. Component styling

Each component's CSS lives inside the `.astro` file in a `<style>` block (Astro scopes it automatically). Component classes are local — no fear of collision.

Global styles (resets, body, typography base) live in `src/styles/base.css`, imported once in `BaseLayout.astro`.

### 6. No accent colors in initial build

Build the site neutral-only — paper, ink, and the faring greys. The accent tokens (`--mars`, `--solar`) are defined but **not used yet**. Adding them will be a deliberate, sparse pass later: roughly one Mars-orange accent moment per screen, Solar-lime on small labels/CTAs only.

---

## Component contracts (suggested props)

**ProductBlock.astro**
```ts
{
  number: string;        // "01"
  category: string;      // "Propulsion"
  name: string;          // "The propulsion system."
  status: string;        // "In development"
  body: string[];        // array of paragraphs
  chips: string[];       // ["In-space", "Re-usable", ...]
  specs: { k: string; v: string }[];
  href: string;          // "read brief" link
}
```

**RoleRow.astro**
```ts
{
  number: string;        // "01"
  title: string;         // "Propulsion Intern"
  type: string;          // "Internship"
  team: string;          // "Propulsion"
  href: string;          // Notion page URL (placeholder for now)
}
```

**StatCell.astro**
```ts
{
  value: string;         // "LEO → Cislunar"
  label: string;         // "Operating envelope"
}
```

---

## Content

Use copy from `p78-homepage.html` verbatim as the starting point. It will be refined later. Product specifics and role descriptions are placeholders.

**Hero image:** the New Zealand limb-of-Earth ISS shot (provided separately). Place in `/public/images/hero.jpg`. Reference: `/images/hero.jpg`.

---

## Animation — defer

For v1, ship with the existing CSS reveal-on-scroll and the simple parallax in the artifact. Don't add GSAP or any animation library yet. Real motion (scroll-pinned hero, video scrub, sequenced reveals) gets added in a later pass once the static foundation is solid.

When motion is added, it goes in the component that owns the effect — not in a global animation file.

---

## Deploy

1. Push repo to GitHub.
2. Connect Netlify to the repo.
3. Build command: `npm run build`. Publish directory: `dist/`.
4. Add custom domain `p78space.com` in Netlify; update DNS at the registrar.
5. Forms work automatically — add `data-netlify="true"` to the `<form>` tag.

---

## Iteration loop

- `npm run dev` → hot-reload local dev server on `localhost:4321`.
- Edit any file, browser updates instantly.
- Push to main → Netlify auto-deploys to production.

---

## What's deliberately out of scope for v1

- Multi-page structure (about, news, careers as dedicated pages)
- CMS for news/careers (using Notion externally instead)
- The cislunar diagram in section 5 (will be a deliberate later build)
- Logo/credibility strip (add when there are 6+ logos)
- Die Grotesk webfont (license + drop in later; current build uses Space Grotesk fallback)
- Accent colors in components (defined as tokens but not applied)
- Per-role pages on the site (Notion handles these)
- Real product specs and role descriptions (placeholders for now)

---

## First task for Claude Code

Read this plan. Read `p78-homepage.html`. Scaffold the Astro project following the architecture rules above — component structure, tokens, base layout, then build each section as a component matching the design in the HTML artifact. Wire the contact form to Netlify Forms. Set up a Netlify deploy config (`netlify.toml`). Confirm the dev server runs and the page matches the artifact visually.

Do **not** add features beyond what the artifact shows. Do **not** introduce frameworks (Tailwind, etc.) beyond the stack listed above. If anything in the artifact looks wrong or inconsistent, flag it before fixing — don't silently "improve" the design.
