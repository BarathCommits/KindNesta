# KindNesta

KindNesta is a **sustainability e-commerce** destination with **Kindness Scores** on every product. Built with [Astro](https://astro.build) for **GitHub Pages** (static hosting only — no separate web server). Tagline: **The kinder way to buy.**

## Features

- Product catalog (hangtags, hangers, packaging, bags, labels, trims, stationery)
- Kindness Score (0–100) with materials and certification notes
- Contact inquiry flow
- Editable CSV catalog — update in Google Sheets or Excel
- GitHub Actions / Pages deploy workflow

## Quick start

```bash
npm install
npm run sync-catalog   # validate catalog
npm run dev
```

Update products anytime: edit [`data/psp-catalog.csv`](./data/psp-catalog.csv) in Sheets — see [`data/CATALOG.md`](./data/CATALOG.md).

Share with partners: [`data/partner-product-template.csv`](./data/partner-product-template.csv) + [`data/SUPPLIER-FILL-GUIDE.md`](./data/SUPPLIER-FILL-GUIDE.md) (also at `/docs/` on the site).

See [DEPLOY.md](./DEPLOY.md) for GitHub Pages instructions.

## Project layout

- `data/psp-catalog.csv` — product catalog (source of truth)
- `data/partner-product-template.csv` — template for partners/suppliers
- `data/PARTNER-TEMPLATE.md` — instructions for partners
- `public/images/products/psp/` — product images
- `public/admin/` — Decap CMS
- `.github/workflows/deploy.yml` — Pages deploy
