# Supplier guideline — KindNesta product template

Share **`partner-product-template.csv`**. Open in Google Sheets or Excel. Keep the header row. **One row = one SKU.**

**Rule:** fill every column. Use **`N/A`** only when that field does not apply to the product (e.g. no plastic → virgin plastic `N/A` or `0`).

---

## 1. Listing (always needed)

| Column | What to put |
| --- | --- |
| `sku` | Your article / SKU code |
| `title` | Clear product name |
| `brand` | Your company / brand |
| `category` | Free text (e.g. packaging, home, other) |
| `description` | What it is and who it is for |
| `materials` | What it is made of |
| `image` | Main photo filename |
| `publicClaims` | Exact wording KindNesta may publish — or `none` |
| `contactEmail` | Who we should reply to |

**Claim rule:** no generic *eco-friendly / green / sustainable / climate neutral* without proof.

---

## 2. Gate checks (needed for score)

Mark each **`PASS` / `FAIL` / `N/A`**. Any **FAIL** caps the Kindness Score at **49** until fixed.

| Column | Meaning |
| --- | --- |
| `A1_noGenericClaim` | No vague eco/green/sustainable wording |
| `A2_claimSpecific` | Claims name attribute + scope |
| `A3_noSelfMadeLabel` | No homemade eco logo sold as a certification |
| `A4_noOffsetClimateClaim` | No carbon-neutral claim based only on offsets |
| `A5_reachBaseline` | REACH / chemical baseline OK for EU use |
| `A6_evidenceOnFile` | Every eco claim has a matching document |
| `A7_tradeoffDisclosed` | Known downsides disclosed |
| `tradeOffNotes` | Short note — or `N/A` |

---

## 3. Score evidence (needed to calculate Kindness Score)

### Certificates (pillar B3)

`certNames`, `certNumbers`, `certExpiryDates`, `certFileNames` — or `N/A` if none.

### Materials (pillar B2)

`bomPercentByWeight`, `recycledContentPercent`, `recycledContentType`, `recycledCertScheme`, `bioBasedPercent`, `virginPlasticPercent`

### Chemicals (pillar B1)

`reachCompliant`, `svhcAboveThreshold`, `svhcList`, `oekoTexOrEquivalent`, `pvcFree`

### Circularity (pillar B4)

`designForRecycling`, `endOfLifeRoute`, `ppwrRecyclabilityGradeIntent` (packaging only — else `N/A`), `reuseOrRefill`

### Shipped packaging (pillar B5)

`shipPackMaterials`, `shipPackWeight`, `shipPackRecycledPlasticPercent`, `overpackJustified`, `sortingLabelPlan`

### Traceability (pillar B6)

`countryOfManufacture`, `tier1SupplierName`, `mainMaterialOriginCountry`, `batchTraceability`, `careAndEndOfLifeInstructions`

### Evidence pack

`evidencePackFileNames` — all attached PDFs, separated by `|`

Full scoring rules: `KINDNESS-SCORE-STANDARD.md`

---

## 4. What to send

1. Completed `partner-product-template.csv`  
2. Photos named as in `image`  
3. Files listed in `certFileNames` / `evidencePackFileNames`

Email: **kindnesta@proton.me**  
Subject: `KindNesta product submission — [Brand] — [Date]`
