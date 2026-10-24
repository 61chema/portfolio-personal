# Porfolio personal — Chema

Personal portfolio built with Next.js 16 (App Router), Tailwind CSS v4 and `next-intl` for English / Spanish localization.

## Stack

- **Framework:** Next.js 16 + React 19 (App Router, Server Components by default)
- **Styles:** Tailwind CSS v4
- **i18n:** `next-intl` with locales `en` and `es`
- **Animations:** `framer-motion`
- **Icons:** `lucide-react` + custom SVG icons for GitHub / LinkedIn

## Local development

```bash
npm install
npm run dev
```

App runs on [http://localhost:3000](http://localhost:3000) and the middleware will redirect to the right locale (`/en` or `/es`).

## Useful scripts

```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project layout

```
src/
  app/
    [locale]/          # root layout, page, globals and favicon (locale-aware)
  components/          # UI components (Hero, About, Projects, ...)
  i18n/                # next-intl routing / request config
  lib/                 # shared constants (social links, CV file, site URL)
  providers/           # client-side providers (LocaleProvider)
messages/
  en.json              # English copy
  es.json              # Spanish copy
public/
  cv_chema.pdf         # downloadable CV
```

## Adding a new project

Edit `messages/en.json` and `messages/es.json`. Inside `projects.featured`, replace any of the `placeholder` entries with:

```json
{
  "name": "Project name",
  "description": "What it does, the problem it solves and the most interesting technical decision.",
  "tags": ["React", "FastAPI", "Azure"],
  "github": "https://github.com/61chema/repo-name",
  "live": "https://your-demo-url.com",
  "status": "in_progress"
}
```

`status` accepts:

- `in_progress` — shows the "In Progress" badge.
- `live` — no badge, GitHub + live links rendered.
- `placeholder` — empty slot, shows "Coming Soon" with no links (current default).

Smaller projects can be added to `projects.other` (same shape, smaller card).

> Both JSON files must keep the **same structure**. If you add a new key in one, add it in the other too.
