# KindNesta product listing rulebook

**Status:** Internal standard for catalogue editors, partners, and AI agents  
**Source of truth:** `data/psp-catalog.csv` (loaded by Astro via `src/content.config.ts`)  
**Related:** [`CATALOG.md`](./CATALOG.md) · [`SUPPLIER-FILL-GUIDE.md`](./SUPPLIER-FILL-GUIDE.md) · [`KINDNESS-SCORE-STANDARD.md`](./KINDNESS-SCORE-STANDARD.md)

---

## 1. Core principles

1. **One row = one sellable SKU** — no duplicate listings for the same product/style.
2. **Honest, specific copy** — follow EU green-claim hygiene (see gate checks A1–A7 in [`KINDNESS-SCORE-STANDARD.md`](./KINDNESS-SCORE-STANDARD.md)).
3. **Evidence before strong claims** — high Kindness Scores require certificates; provisional scores must be marked `scoreVerified=FALSE`.
4. **Buyer-facing vs internal** — price, MOQ, and pack size are B2B back-office fields; materials, score, and claims are public.
5. **Distinct product images** — every SKU gets its own image path; never reuse a range-sheet or collage for multiple products.

---

## 2. When a product may be listed

| Requirement | Rule |
| --- | --- |
| Minimum data | `id`, `sku`, `title`, `brand`, `category`, `shortDescription`, `image`, `kindnessScore` |
| To publish green claims | Gate checks A1–A7 pass + pillar evidence on file |
| To show **verified** score | KindNesta review complete → `scoreVerified=TRUE` |
| Provisional listing | Allowed with `scoreVerified=FALSE` and notes explaining gaps (e.g. awaiting GOTS/FSC docs) |

**Do not list** duplicate `id` values. **Do not** use generic claims (“eco-friendly”, “green”, “sustainable”, “climate neutral”) without recognised proof.

---

## 3. Product ID conventions

| Prefix | Brand / range | Example |
| --- | --- | --- |
| `kn-` | KindNesta packaging & trims | `kn-hangtags` |
| `gg-` | Globgrid apparel lineups | `gg-ma-cherie-bodysuit-2pk-hanger` |
| `bh-` | Partner home / personal-care | `bh-bamboo-bottle-500ml` |

**Rules**

- `id` is lowercase, hyphenated, unique, and stable (do not rename after publish without redirects).
- `sku` is the supplier article code (may differ from `id`).
- Use `parentId` + `variantType` + `variantValue` only for true variants (size, colour, pack) — not for separate styles.

---

## 4. Categories

Allowed `category` values (schema enum):

`hangtags` · `hangers` · `packaging` · `bags` · `polybags` · `stationery` · `labels` · `trims` · `apparel` · `home` · `personal-care`

- Set `subcategory` to the buyer-facing browse node (e.g. `Newborn bodysuits`, `Bamboo home`, `Hotel amenities`).
- Set `productFamily` to the collection or supplier grouping (e.g. `SS26 Ma Cherie Newborn Girls`, `Bamboo home`).

---

## 5. Copy rules

### Title

- Format: `{Product name} — {Collection or brand context}` when helpful.
- Include pack count in the title when it is a defining attribute (`2pk`, `3pk`, etc.).

### Descriptions

- `shortDescription` — one sentence for cards and search; factual, no hype.
- `bulletPoints` — 3–5 pipe-separated (`|`) facts: materials, cert, pack contents, use case.
- `description` — 1–3 sentences expanding the short description; state collection/season where relevant.

### Claims

- Name the **attribute** and **scope** (e.g. “GRS certified recycled cotton paper hangtag” not “sustainable hangtag”).
- If using placeholder photography, say **“Illustrative AI-generated packshot until supplier photography is available.”**
- Never imply Kindness Score is a third-party certification.

### Tags

- `ecoTags` — pipe-separated scheme slugs (`grs-certified`, `fsc-certified`, `provisional-score`, etc.).
- `searchKeywords` — pipe-separated terms buyers might search (SKU, season, collection, category synonyms).
- `relatedIds` — pipe-separated sibling SKUs in the same collection (cross-sell).

---

## 6. Image rules

See **[`PRODUCT-IMAGE-STANDARD.md`](./PRODUCT-IMAGE-STANDARD.md)**.

| Product type | Image path | Format |
| --- | --- | --- |
| KindNesta `kn-*` | `/images/products/kn/{id}.png` | Approved packshot |
| Globgrid `gg-*` | `/images/products/apparel/{id}.png` | AI-generated packshot PNG |
| Partner `bh-*` | `/images/products/home/{id}.png` | AI-generated packshot PNG |

**Required:** one SVG per SKU via `npm run generate-lineup-images`.

**Forbidden:** original range sheets, PDF crops, `crops/` folders, shared collages on the live site.

---

## 7. Kindness Score

| Band | Score | Meaning |
| ---: | ---: | --- |
| Strong | 80–100 | Strong third-party evidence |
| Good | 50–79 | Solid evidence; some gaps |
| Fair | 0–49 | Limited evidence or gate failure |

- Set `kindnessScoreNotes` to explain the number (certs named, recycled %, provisional gaps).
- Any gate **Fail** → max score **49** until fixed; remove related marketing claims.
- Re-score when certificates expire or BOM changes (evidence ≤ 24 months old).

Full methodology: [`KINDNESS-SCORE-STANDARD.md`](./KINDNESS-SCORE-STANDARD.md).

---

## 8. Variants, pricing, and stock

| Field | Rule |
| --- | --- |
| `parentId` | Shared parent for variant family |
| `variantType` / `variantValue` | e.g. `Size` / `M` or `Pack` / `3pk` |
| `price` + `currency` | B2B ex-works unless `priceBasis=suggested-retail` |
| `unit` | `piece` or `meter` |
| `packSize` | Supplier pack label (e.g. `1000 Pcs`, `1000 Meters`) |
| `moq` | Minimum order quantity (integer) |
| `featured` | `TRUE` sparingly — hero catalogue picks only |
| `inStock` | `TRUE` / `FALSE` for availability signal |

---

## 9. Editorial workflow

### Adding or editing listings

1. Edit `data/psp-catalog.csv` (or merge partner template rows).
2. Add/update image under `public/images/products/…`.
3. Run `npm run sync-catalog` to validate against the schema.
4. For new apparel/home lineups: `node scripts/import-lineups.mjs` then `npm run generate-lineup-images`.
5. Run `npm run build` before shipping static `docs/` output.

### Partner submissions

1. Partner completes `partner-product-template.csv` + evidence PDFs.
2. KindNesta validates gates and pillars.
3. Merge into `psp-catalog.csv`; set `scoreVerified` only after document review.

---

## 10. Checklist before publish

- [ ] Unique `id` and correct `sku`
- [ ] Valid `category` enum value
- [ ] Specific copy — no banned generic green claims
- [ ] Dedicated `image` file exists and matches path in CSV
- [ ] `kindnessScore` + `kindnessScoreNotes` align with evidence
- [ ] `scoreVerified` reflects review state
- [ ] `npm run sync-catalog` passes
- [ ] Product page renders correctly in `npm run dev`

---

## 11. Agent / automation rules

When an AI agent adds catalogue rows:

1. Never duplicate an existing `id`.
2. Never point multiple products at the same image unless they are true variants sharing one parent photo.
3. Prefer `npm run generate-lineup-images` for `gg-*` / `bh-*` assets — do not reintroduce range-sheet PNGs.
4. Mark new supplier-sourced scores `scoreVerified=FALSE` until certificates are verified.
5. Run `npm run sync-catalog` after CSV edits.
