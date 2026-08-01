# Deploy KindNesta (GitHub Pages only)

KindNesta is a **static site**. Hosting is on **GitHub Pages** — no GoDaddy or other web server.

Build output lives in `docs/` (`astro.config.mjs`: `base: '/KindNesta'`, `outDir: './docs'`).

Live URL:

- `https://barathcommits.github.io/KindNesta/`

## Option A — GitHub Actions (recommended)

This repo includes [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). On every push to `main` it builds and deploys.

1. Push to GitHub:

```bash
git add .
git commit -m "Update KindNesta"
git push origin main
```

2. In **Settings → Pages**:
   - **Source:** GitHub Actions

3. Check the **Actions** tab that the “Deploy to GitHub Pages” workflow succeeded.

## Option B — Branch folder `/docs`

If you prefer not to use Actions:

1. Run `npm run build` locally (updates `docs/`)
2. Commit and push `docs/`
3. In **Settings → Pages**:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/docs`

## After you change the site

```bash
npm run build
git add .
git commit -m "Rebuild static site"
git push origin main
```

(With Option A, the Action rebuilds for you on push; you still need a build commit if you rely on Option B only.)

## Update products

See [`data/CATALOG.md`](./data/CATALOG.md).

- Edit `data/psp-catalog.csv`
- Run `npm run sync-catalog`
- Rebuild / push as above

## Local development

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open `http://localhost:4321/KindNesta/`.

## Custom domain later (optional)

Still on GitHub Pages — no separate host:

1. Add the domain under **Settings → Pages**
2. Add `public/CNAME` with your domain
3. In `astro.config.mjs`, set `site` to your domain and change `base` to `'/'`
4. Rebuild and push
