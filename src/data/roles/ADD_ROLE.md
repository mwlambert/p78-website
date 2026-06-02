Cross-page nav fix:

Nav.astro and Footer.astro anchors changed from #mission → /#mission (etc.) — works identically on the home page (just hash change, no reload) and on any subpage (navigates home + scrolls).
Dynamic JD route:

One template: src/pages/careers/[slug].astro. Uses getStaticPaths + import.meta.glob to pre-render one HTML file per role JSON at build time.
One Careers section: Careers.astro globs the same directory and sorts by order.
Sitemap auto-includes every role page (and any future ones) — no manual list.
Per-role data, file = src/data/roles/<slug>.json:


{
  "slug": "...",
  "order": 1,
  "rowTitle": "Propulsion Intern",
  "rowType": "Internship",
  "rowTeam": "Propulsion",
  "pageTitle": "Propulsion Engineering Intern",
  "pageDescription": "...",
  "pageMeta": "6-month end-of-study internship · France · September 2026",
  "sections": [
    { "label": "Why P78",   "paragraphs": ["...", "..."] },
    { "label": "About",     "paragraphs": ["..."] },
    { "label": "What you'd work on", "bullets": ["...", "..."] }
  ]
}
Each section can have either paragraphs (renders as prose) or bullets (em-dash list) — template handles both.

Three role files now exist: propulsion-engineering-intern.json, propellant-intern.json, open-application.json (placeholder copy — edit when ready).

Routes verified:

/ 200 · /careers/propulsion-engineering-intern 200 · /careers/propellant-intern 200 · /careers/open-application 200 · garbage slug → 404
To add a new role (e.g., your future FTE):

Create src/data/roles/<slug>.json with the schema above.
Set its order field for where it sits in the careers section.
That's it — careers list auto-includes it, page auto-builds, sitemap auto-updates.
For the Why P78 variation between intern vs FTE: each role JSON has its own Why P78 paragraphs. Copy-paste the intern boilerplate for new interns; write a new one for the FTE. If that becomes a maintenance pain (say 5+ roles), we can extract Why P78 templates by role type — but for now per-role copy is the simplest answer.