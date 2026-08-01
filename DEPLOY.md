# Deploy KindNesta (GitHub Pages + GoDaddy)

## GitHub Pages from this repo

This project now builds to plain static files in `docs/`, including `docs/index.html`.
That means GitHub Pages can host it directly from the repository without a server.

## 1. Push the repo to GitHub

```bash
git add .
git commit -m "Update KindNesta static site"
git push origin main
```

## 2. Enable GitHub Pages

In **GitHub → Settings → Pages**:

1. **Source:** `Deploy from a branch`
2. **Branch:** `main`
3. **Folder:** `/docs`

Your site will then be available at:

- `https://barathcommits.github.io/KindNesta/`

## 3. Custom domain later (optional)

If you later attach a custom domain:

1. Add the domain in **Settings → Pages**
2. Add a `public/CNAME` file containing only your domain
3. Update `astro.config.mjs`:
   - set `site` to your real domain
   - remove `base`

## 4. Rebuild static files after changes

Whenever you change content or styling:

```bash
npm run build
```

That regenerates the plain static site in `docs/`.

## 5. Update products

- Product content: `src/content/products/`
- Product images: `public/images/products/`
- Admin config: `public/admin/config.yml`

## 6. Local development

Requires Node.js 22+.

```bash
npm install
npm run dev
```
