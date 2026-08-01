# Updating the KindNesta product catalog (CSV / Sheets)

The live catalog is **`data/psp-catalog.csv`** (Amazon-style fields). Astro loads it directly.

## For KindNesta editors

1. Open `data/psp-catalog.csv` in Google Sheets / Excel
2. Edit rows (one SKU / variant per row)
3. Save / download as CSV and replace the file
4. Run `npm run sync-catalog`
5. Refresh `npm run dev` (or `npm run build` to publish)

## For partners / suppliers

Send them:

- [`partner-product-template.csv`](./partner-product-template.csv) — blankable template with examples
- [`PARTNER-TEMPLATE.md`](./PARTNER-TEMPLATE.md) — field-by-field instructions

They fill the template and return it; you merge into `psp-catalog.csv`.

## Amazon-style field groups

**On site:** title, brand, category, subcategory, shortDescription, bulletPoints, description, materials, dimensions, weight, image / imageGallery, variants (`parentId`, `variantType`, `variantValue`), kindnessScore, ecoTags, relatedIds

**Internal only:** price, currency, packSize, moq, quality, productFamily

## Categories

`hangtags` · `hangers` · `packaging` · `bags` · `polybags` · `stationery` · `labels` · `trims`
