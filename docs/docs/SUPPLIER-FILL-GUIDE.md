# Supplier guideline — KindNesta product templates

**Share with every supplier:**

| File | When to use |
| --- | --- |
| `partner-product-template.csv` | **Always** — one row per SKU (core listing) |
| `partner-product-evidence.csv` | **Optional** — only if you make green claims, want a stronger Kindness Score, or KindNesta asks |
| `KINDNESS-SCORE-STANDARD.md` | Reference for how scoring works |
| `partner-score-checklist.csv` | Optional quick Pass/Fail self-check |

Open CSVs in **Google Sheets** or **Excel**. Keep the header row. **Leave any column blank if it does not apply** — do not invent data.

---

## 1. Before you start

1. Decide the **public claims** you want KindNesta to publish (specific only).
2. Gather photos and any certificates you already have.
3. Do **not** use *eco-friendly*, *green*, *sustainable*, or *climate neutral* unless you can prove them under EU EmpCo rules — prefer specific claims with % and scheme names.

**Good:** `Made from 100% GRS-certified recycled cotton paper`  
**Bad:** `Eco-friendly product`

---

## 2. Core template (required)

`partner-product-template.csv` — enough to list the product and start a conversation.

| Column | Notes |
| --- | --- |
| `sku` | Your article / SKU code |
| `title` | Clear name buyers will see |
| `brand` | Your company / brand |
| `category` | Free text (e.g. packaging, home, personal-care, food, apparel-trims, other) |
| `subcategory` | Optional finer aisle |
| `shortDescription` | 1–2 sentences |
| `bulletPoints` | 3–5 bullets separated by `\|` |
| `description` | Longer listing copy |
| `materials` | What it is made of |
| `dimensions` / `weight` | Optional |
| `image` / `imageGallery` | Photo filenames (`\|` for gallery) |
| `publicClaims` | Exact wording KindNesta may publish |
| `certNames` / `certNumbers` / `certExpiryDates` / `certFileNames` | Only if you have certs — otherwise leave blank |
| `countryOfManufacture` | Where it is made |
| `price` / `currency` / `unit` / `packSize` / `moq` | **Optional & private** — not shown on the public site |
| `contactEmail` / `dateSubmitted` | Who we should reply to |
| `notes` | Anything else — variants, lead times, exclusions |

**Variants:** one row per SKU. Mention the parent product in `notes` if helpful (e.g. “Style 2 of Hangtag family”).

---

## 3. Evidence template (optional)

`partner-product-evidence.csv` — match rows by `sku` to the core sheet.

Use this when:

- You claim recycled / organic / FSC / similar content, **or**
- You want KindNesta to score the product beyond a basic provisional listing, **or**
- We ask for it during review

Every evidence column can be blank or `N/A`. Only fill what is true for your product.

Typical modules (fill only what fits):

| Topic | Columns |
| --- | --- |
| Recycled / bio / plastic | `recycledContentPercent`, `recycledContentType`, `recycledCertScheme`, `bioBasedPercent`, `virginPlasticPercent`, `bomPercentByWeight` |
| Chemicals (EU) | `reachCompliant`, `svhcAboveThreshold`, `svhcList`, `oekoTexOrEquivalent`, `pvcFree` |
| Circularity | `designForRecycling`, `endOfLifeRoute`, `ppwrRecyclabilityGradeIntent`, `reuseOrRefill` |
| Shipped packaging | `shipPackMaterials`, `shipPackWeight`, `shipPackRecycledPlasticPercent`, `overpackJustified`, `sortingLabelPlan` |
| Traceability | `tier1SupplierName`, `mainMaterialOriginCountry`, `batchTraceability`, `careAndEndOfLifeInstructions` |
| Gate self-check | `A1`–`A7` as `PASS` / `FAIL` / `N/A` |
| Score proposal | `proposedKindnessScore`, `kindnessScoreNotes`, `evidencePackFileNames` |

Any **FAIL** on a gate → KindNesta will cap the score at **49** and block related claims until fixed.

---

## 4. Certificates (only if you make those claims)

| If you claim… | Usual proof |
| --- | --- |
| Recycled content | GRS or RCS |
| Organic cotton | GOTS |
| Responsible paper / forest fibre | FSC or PEFC |
| Tested for harmful substances (textiles) | OEKO-TEX Standard 100 |
| Broad excellent eco performance | EU Ecolabel / Blue Angel |

You can list products **without** eco-certs. Then avoid recycled/organic/FSC-style claims; the Kindness Score stays lower until evidence arrives.

---

## 5. What to send back

1. Completed `partner-product-template.csv` (required)  
2. `partner-product-evidence.csv` (optional)  
3. Photos + any certificate PDFs named in the sheets  

Email subject: `KindNesta product submission — [Brand] — [Date]`  
Send to: **kindnesta@proton.me**

---

## 6. How KindNesta uses your data

1. Reviews the core listing for clarity and claim hygiene  
2. If evidence is provided, runs gate checks and scores pillars (`KINDNESS-SCORE-STANDARD.md`)  
3. Publishes product + Kindness Score (**provisional** until evidence is verified)  
4. Only publishes **specific** claims from `publicClaims`

---

## 7. Quick checklist before send

- [ ] Core sheet: one row per SKU  
- [ ] No generic “eco / green / sustainable” wording  
- [ ] Blank columns left blank (not filled with guesses)  
- [ ] Cert claims have matching numbers + PDFs (if any)  
- [ ] Photo filenames match `image` / `imageGallery`  
- [ ] Evidence sheet only if relevant — same `sku` values as core  

Questions? **kindnesta@proton.me** or the website contact form.
