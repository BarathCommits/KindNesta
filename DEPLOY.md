# Deploy KindNesta (GitHub Pages only)

KindNesta is a **static site**. Hosting is on **GitHub Pages** — no GoDaddy or other web server.

Build output lives in `docs/` (`astro.config.mjs`: `base: '/'`, `outDir: './docs'`, custom domain).

Live URL:

- `https://kindnesta.com/` (GitHub Pages + custom domain)

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

Open `http://localhost:4321/`.

## Custom domain

Configured for `kindnesta.com`:

1. `public/CNAME` contains `kindnesta.com`
2. `astro.config.mjs` uses `site: 'https://kindnesta.com'` and `base: '/'`
3. In **Settings → Pages**, add the custom domain and enable **Enforce HTTPS** once the certificate is ready
4. DNS should point at GitHub Pages (A/AAAA or CNAME per GitHub’s docs)

### Expected DNS (GoDaddy)

| Host | Type | Value |
|------|------|--------|
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `@` | AAAA | `2606:50c0:8000::153` |
| `@` | AAAA | `2606:50c0:8001::153` |
| `@` | AAAA | `2606:50c0:8002::153` |
| `@` | AAAA | `2606:50c0:8003::153` |
| `www` | CNAME | `barathcommits.github.io.` |

Do not add extra A/AAAA/CNAME records for `@` or `www` beyond the table above — extras can block certificate issuance. If you use CAA records, allow `letsencrypt.org`.

### Browser “certificate” / NET::ERR_CERT errors

If HTTPS shows a certificate for `*.github.io` instead of `kindnesta.com`, GitHub never finished provisioning the custom-domain cert (or it got stuck). DNS can be correct while this still happens.

**Repair (repo Actions):** run the **Fix Pages SSL certificate** workflow (`workflow_dispatch`). It clears and re-adds `kindnesta.com`, waits for Let’s Encrypt approval, then turns on **Enforce HTTPS**.

**Repair (GitHub UI):** Settings → Pages → remove the custom domain → Save → add `kindnesta.com` again → wait until the domain shows a checkmark → enable **Enforce HTTPS**.
