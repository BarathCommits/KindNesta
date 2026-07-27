# Deploy KindNesta (GitHub Pages + GoDaddy)

## 1. Push the repo to GitHub

```bash
git init
git add .
git commit -m "Initial KindNesta catalog site"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USER/kindnesta.git
git push -u origin main
```

## 2. Enable GitHub Pages

1. Repo **Settings → Pages**
2. **Source:** GitHub Actions
3. After the first successful workflow run, your site will be at  
   `https://YOUR_GITHUB_USER.github.io/kindnesta/` (project site)  
   or a custom domain once configured.

### Project site base path

If you use a project URL (`username.github.io/kindnesta`) **without** a custom domain, set in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://YOUR_GITHUB_USER.github.io',
  base: '/kindnesta',
});
```

With a GoDaddy custom domain pointing at Pages, keep `base` unset (root `/`) and set `site` to your domain, e.g. `https://www.yourdomain.com`.

## 3. Connect GoDaddy domain

1. In GitHub Pages settings, add your custom domain (e.g. `www.yourdomain.com`) and enable **Enforce HTTPS** once DNS propagates.
2. In GoDaddy DNS for the domain:

| Type  | Name | Value / points to                                      | TTL  |
|-------|------|--------------------------------------------------------|------|
| CNAME | www  | `YOUR_GITHUB_USER.github.io`                           | 1 hr |
| A     | @    | `185.199.108.153`                                      | 1 hr |
| A     | @    | `185.199.109.153`                                      | 1 hr |
| A     | @    | `185.199.110.153`                                      | 1 hr |
| A     | @    | `185.199.111.153`                                      | 1 hr |

Confirm current apex A records in [GitHub’s custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) — they can change.

3. Add a `public/CNAME` file containing only your domain (e.g. `www.yourdomain.com`) so deploys keep the domain setting.

## 4. Update products

### Option A — Decap CMS (`/admin`)

1. Edit `public/admin/config.yml` and set `backend.repo` to `YOUR_GITHUB_USER/kindnesta`.
2. Create a GitHub OAuth App (**Settings → Developer settings → OAuth Apps**):
   - Homepage URL: your site URL
   - Authorization callback URL: your OAuth proxy callback (see below)
3. Run a small OAuth proxy (required for Decap’s GitHub backend on static hosts), e.g.:
   - [decap-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider) on Render/Railway/Fly, or a Cloudflare Worker equivalent
4. Point Decap at that proxy (often via `site_domain` / `base_url` in the provider env, and optional `local_backend` only for local testing).
5. Open `https://your-domain.com/admin`, log in with GitHub, add/edit products and images.
6. Saving commits to `main` → Actions rebuilds the site in ~1–2 minutes.

### Option B — Edit files on GitHub (no OAuth)

1. Open `src/content/products/` in the repo
2. Add a new `.md` file (copy an existing product as a template)
3. Upload images under `public/images/products/`
4. Commit to `main`

## 5. Local development

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
npm run preview
```
