# Rohit Sahani Portfolio

Personal portfolio website for Rohit Sahani, focused on AI-enabled product work, frontend engineering, and full-stack delivery.

## Live Portfolio

- Portfolio: [https://rohitsahani-dev.github.io/#home](https://rohitsahani-dev.github.io/#home)

## Featured Project

### KaiStream

KaiStream is a premium full-stack anime streaming platform built as a showcase project inside this repository.

Highlights:

- Next.js 15 App Router frontend
- TypeScript, Tailwind CSS, Framer Motion, React Query, Zustand
- Express.js backend with PostgreSQL, Prisma, Redis, and JWT auth
- Anime discovery pages, watch player, user dashboard, favorites, history, settings, and admin panel
- HLS playback with Video.js, subtitle support, and multiple server options

## Repository Structure

```text
Portfolio/
├─ assets/
├─ index.html
├─ script.js
├─ style.css
├─ apps/
│  ├─ web/
│  └─ api/
├─ packages/
│  └─ shared/
└─ scripts/
```

## Local Portfolio Usage

Open the static portfolio locally with `index.html`, or publish it through GitHub Pages.

## KaiStream Local Usage

From the repo root:

```powershell
npm install
npm run build
npm run start --workspace @kaistream/web
```

Then open:

- KaiStream home: `http://127.0.0.1:3000`
- Watch demo: `http://127.0.0.1:3000/watch/neon-ronin-zero-eclipse/episode/1`
- Admin page: `http://127.0.0.1:3000/admin`

## Notes

- The first portfolio project card showcases KaiStream.
- Clicking the KaiStream project card opens the local KaiStream app when the Next.js server is running.
