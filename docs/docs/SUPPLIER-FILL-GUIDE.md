# Supplier guideline — how to fill the KindNesta product template

**Share this file with every supplier** together with:

- `partner-product-template.csv` (the spreadsheet to fill)
- `KINDNESS-SCORE-STANDARD.md` (scoring rules)

Open the CSV in **Google Sheets** or **Excel**. Keep the header row unchanged. **One row = one SKU / variant.**

---

## 1. Before you start

1. Decide the exact **public claims** you want KindNesta to publish (specific only).
2. Gather PDFs: certificates, REACH letter, BOM, pack spec, photos.
3. Do **not** use words like *eco-friendly*, *green*, *sustainable*, or *climate neutral* unless you can prove excellent performance under EU EmpCo rules (e.g. EU Ecolabel) or you replace them with specific claims.

**Good claim:** `Made from 100% GRS-certified recycled cotton paper`  
**Bad claim:** `Eco-friendly hangtag`

---

## 2. Column groups (what to fill)

### A. Identity (required)

| Column | How to fill |
| --- | --- |
| `id` | Unique lowercase id, e.g. `brand-hangtag-001` |
| `sku` | Your article / SKU code |
| `title` | Clear product name buyers will see |
| `brand` | Brand on the label |
| `category` | Exactly one of: `hangtags` `hangers` `packaging` `bags` `polybags` `stationery` `labels` `trims` |
| `subcategory` | Finer aisle, e.g. `GRS Hangtags` |
| `productFamily` | Family name for grouping |
| `parentId` | Same value for all variants of one product; blank if no variants |

### B. Listing content (required for the website)

| Column | How to fill |
| --- | --- |
| `shortDescription` | 1–2 sentences, specific claims only |
| `bulletPoints` | 3–5 bullets separated by `\|` |
| `description` | Longer story; still specific, no generic green fluff |
| `materials` | What it is made of |
| `dimensions` / `weight` | Size and unit weight if known |
| `image` | Main photo filename |
| `imageGallery` | Extra photos separated by `\|` (include main first) |
| `variantType` / `variantValue` | e.g. `Style` / `Style 1` |
| `ecoTags` | e.g. `grs-certified\|recycled\|fsc-certified` |
| `featured` / `inStock` | `TRUE` or `FALSE` |

### C. Trade fields (optional — not shown publicly)

`price`, `currency`, `priceBasis` (`ex-works` or `suggested-retail`), `unit` (`piece` or `meter`), `packSize`, `moq`, `quality`

### D. Claims & certificates (required if you make green claims)

| Column | How to fill |
| --- | --- |
| `publicClaims` | Exact sentence(s) allowed on the site |
| `certNames` | e.g. `GRS\|FSC` |
| `certNumbers` | Matching certificate numbers |
| `certExpiryDates` | `YYYY-MM-DD` |
| `certScope` | What the cert covers (must include this SKU) |
| `certFileNames` | PDF filenames you attach |

**Which cert is typical?**

| If you claim… | Usual proof |
| --- | --- |
| Recycled content | **GRS** or **RCS** |
| Organic cotton | **GOTS** |
| Responsible paper/forest fibre | **FSC** or **PEFC** |
| Tested for harmful substances (textiles) | **OEKO-TEX Standard 100** |
| Broad “excellent eco performance” | **EU Ecolabel** / Blue Angel |

You can sell without eco-certs, but then **do not** make recycled/organic/FSC-style claims, and Kindness Score will stay low until evidence arrives.

### E. Material evidence (required for Strong scores)

| Column | How to fill |
| --- | --- |
| `bomPercentByWeight` | e.g. `recycled cotton paper 98%\|coating 2%` |
| `recycledContentPercent` | Number only, e.g. `100` |
| `recycledContentType` | `pre-consumer` / `post-consumer` / `mixed` |
| `recycledCertScheme` | `GRS` / `RCS` / etc. |
| `bioBasedPercent` | If relevant |
| `virginPlasticPercent` | `0` if none |

### F. Chemicals (required for EU)

| Column | Values |
| --- | --- |
| `reachCompliant` | `YES` / `NO` |
| `svhcAboveThreshold` | `YES` / `NO` |
| `svhcList` | Names if YES |
| `oekoTexOrEquivalent` | Cert name or `N/A` |
| `pvcFree` | `YES` / `NO` / `N/A` |

### G. Circularity & shipped packaging

Fill design-for-recycling, end-of-life route, PPWR grade intent (if packaging), reuse/refill, and ship-pack material/weight/recycled plastic % / overpack / sorting label plan.

### H. Traceability (DPP-ready)

`countryOfManufacture`, `tier1SupplierName`, `mainMaterialOriginCountry`, `batchTraceability` (`YES`/`NO`), `careAndEndOfLifeInstructions`

### I. Gate checks A1–A7

Use `PASS`, `FAIL`, or `N/A`.  
Any **FAIL** → KindNesta will cap score at **49** and block related claims until fixed.

### J. Score proposal

| Column | How to fill |
| --- | --- |
| `proposedKindnessScore` | Your estimate 0–100 (KindNesta confirms) |
| `kindnessScoreNotes` | Why |
| `evidencePackFileNames` | All attached files, `\|` separated |
| `contactEmail` | Who KindNesta should email |
| `dateSubmitted` | `YYYY-MM-DD` |

---

## 3. Variants

Same product, different size/style/colour:

- Same `parentId`
- Different `id`, `sku`, `variantValue`, preferably different `image`
- Shared certs OK if **scope** covers every variant

---

## 4. What to send back

1. Completed `partner-product-template.csv`  
2. Evidence ZIP/PDFs listed in `evidencePackFileNames`  
3. Product images (clear background preferred)

Email subject suggestion: `KindNesta product submission — [Brand] — [Date]`  
Send to: **kindnesta@proton.me**

---

## 5. How KindNesta uses your row

1. Validates Gate checks (A1–A7)  
2. Scores pillars from your evidence (see `KINDNESS-SCORE-STANDARD.md`)  
3. Publishes product + Kindness Score (provisional until evidence verified)  
4. Only publishes **specific** claims you listed in `publicClaims`

---

## 6. Quick quality checklist before send

- [ ] No generic “eco/green/sustainable” wording  
- [ ] Recycled/organic/FSC claims have cert number + PDF  
- [ ] BOM % adds to ~100%  
- [ ] REACH answered  
- [ ] Country of manufacture filled  
- [ ] Photos named exactly as in `image` / `imageGallery`  
- [ ] One row per SKU  

Questions? Email **kindnesta@proton.me** or use the website contact form.
