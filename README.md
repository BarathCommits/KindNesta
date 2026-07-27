# KindNesta

KindNesta is a startup that **sources and sells** eco-friendly products for retail outlets and enterprise buyers, with **Kindness Scores** on every product. Built with [Astro](https://astro.build) for **GitHub Pages** + a **GoDaddy** custom domain.

## Features

- Home, Products (filter/sort), Product detail, About, Contact
- Kindness Score (0–100), pack size, MOQ, and suggested retail on every product
- Sales inquiry flow for retail and enterprise buyers
- Product content as Markdown in the repo
- Decap CMS admin at `/admin` for browser-based updates
- GitHub Actions deploy workflow

## Quick start

```bash
npm install
npm run dev
```

See [DEPLOY.md](./DEPLOY.md) for GitHub Pages, GoDaddy DNS, and product update instructions.

## Project layout

- `src/content/products/` — product Markdown (source of truth)
- `public/images/products/` — product images
- `public/admin/` — Decap CMS
- `.github/workflows/deploy.yml` — Pages deploy
