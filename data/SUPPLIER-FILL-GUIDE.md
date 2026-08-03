# Supplier guideline — KindNesta product template

Share **`partner-product-template.csv`**. Open in Google Sheets or Excel.

**Sheet layout**

| Row | What it is |
| --- | --- |
| 1 | **Company name** — put your company in column B |
| 2 | **Date** — submission date (`YYYY-MM-DD`) in column B |
| 3 | **Column titles** — do not change |
| 4+ | **One row per SKU** |

**Rule:** fill every product column. Use **`N/A`** only when that field does not apply (e.g. no plastic → virgin plastic `N/A` or `0`).

---

## 0. Header rows (once per sheet)

| Row label | What to put in column B |
| --- | --- |
| `Company name` | Legal or trading name of the supplier |
| `Date` | Date you send this sheet (`YYYY-MM-DD`) |

---

## 1. Listing (always needed)

| Column | What to put |
| --- | --- |
| `sku` | Your article / SKU code |
| `title` | Clear product name |
| `category` | Free text (e.g. packaging, home, other) |
| `description` | What it is and who it is for |
| `materials` | What it is made of |
| `image` | Main photo filename |
| `publicClaims` | Exact wording KindNesta may publish — or `none` |
| `contactEmail` | Who we should reply to for this SKU |

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

| Column | What to put |
| --- | --- |
| `certNames` | Scheme names, e.g. `GRS\|FSC` — or `N/A` |
| `certNumbers` | Matching certificate numbers — or `N/A` |
| `certExpiryDates` | `YYYY-MM-DD` (same order as names) — or `N/A` |
| `certFileNames` | PDF filenames you attach — or `N/A` |

### Materials (pillar B2)

| Column | What to put |
| --- | --- |
| `bomPercentByWeight` | Breakdown that adds ~100%, e.g. `paper 98%\|coating 2%` |
| `recycledContentPercent` | Number only (e.g. `100`) — or `N/A` |
| `recycledContentType` | `pre-consumer` / `post-consumer` / `mixed` — or `N/A` |
| `recycledCertScheme` | `GRS` / `RCS` / equivalent — or `N/A` |
| `bioBasedPercent` | Number — or `N/A` |
| `virginPlasticPercent` | `0` if none, else % — or `N/A` |

### Chemicals (pillar B1)

| Column | What to put |
| --- | --- |
| `reachCompliant` | `YES` / `NO` |
| `svhcAboveThreshold` | `YES` / `NO` |
| `svhcList` | Substance names if YES — else `N/A` |
| `oekoTexOrEquivalent` | Cert name — or `N/A` |
| `pvcFree` | `YES` / `NO` / `N/A` |

### Circularity (pillar B4)

| Column | What to put |
| --- | --- |
| `designForRecycling` | Short description — or `N/A` |
| `endOfLifeRoute` | e.g. paper recycling / reuse — or `N/A` |
| `ppwrRecyclabilityGradeIntent` | Packaging only (e.g. target grade B+) — else `N/A` |
| `reuseOrRefill` | Only if relevant — else `N/A` |

### Shipped packaging (pillar B5)

| Column | What to put |
| --- | --- |
| `shipPackMaterials` | Outer / ship pack materials — or `N/A` |
| `shipPackWeight` | Weight — or `N/A` |
| `shipPackRecycledPlasticPercent` | `%`, `0`, or `no plastic pack` — or `N/A` |
| `overpackJustified` | `YES`/`NO` + short reason — or `N/A` |
| `sortingLabelPlan` | `YES` / `NO` — or `N/A` |

### Traceability (pillar B6)

| Column | What to put |
| --- | --- |
| `countryOfManufacture` | Country where made |
| `tier1SupplierName` | Factory / mill name — or `N/A` |
| `mainMaterialOriginCountry` | Origin of main raw material — or `N/A` |
| `batchTraceability` | `YES` / `NO` — or `N/A` |
| `careAndEndOfLifeInstructions` | Care / disposal text — or `N/A` |

### Evidence pack

| Column | What to put |
| --- | --- |
| `evidencePackFileNames` | All attached PDFs, separated by `\|` |

Full scoring rules: `KINDNESS-SCORE-STANDARD.md`

---

## 4. What to send

1. Completed `partner-product-template.csv` (company name + date filled on rows 1–2)  
2. Photos named as in `image`  
3. Files listed in `certFileNames` / `evidencePackFileNames`

Email: **kindnesta@proton.me**  
Subject: `KindNesta product submission — [Company] — [Date]`
