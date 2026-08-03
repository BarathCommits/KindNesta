# KindNesta Kindness Score — EU-aligned standard

**Status:** KindNesta internal standard for product scoring and partner evidence  
**Scope:** Products sold on the KindNesta sustainability marketplace (including packaging, hangtags, hangers, bags, labels, trims, stationery, and expanding categories) marketed for or into the EU  
**Not:** A third-party life-cycle assessment (LCA) or PEF study. Scores help compare assortment; public claims must still follow EU green-claim rules.

## Legal anchors (Europe)

| Framework | What it means for KindNesta / partners |
| --- | --- |
| **Directive (EU) 2024/825** — Empowering Consumers for the Green Transition (EmpCo / ECGT) | From **27 Sep 2026**: ban generic claims (“eco-friendly”, “green”, “sustainable”) without proven excellent performance; ban many offset-based “climate neutral” product claims; **self-made sustainability labels** (not based on a recognised certification scheme or public authority) are prohibited. |
| **Proposed Green Claims Directive** | **Withdrawn / paused (2025)**. Use EmpCo + claim-file best practice (scientific evidence, life-cycle thinking, no unjustified trade-offs). |
| **PPWR — Regulation (EU) 2025/40** | Packaging recyclability, recycled content (especially plastics), minimisation, reuse/refill where applicable. Broad application from **mid/Aug 2026**; recyclability grades ramp toward **2030**. |
| **ESPR — Regulation (EU) 2024/1781** | Ecodesign + **Digital Product Passport** framework. Textiles are a priority; delegated acts still landing — collect DPP-ready data now. |
| **REACH / CLP** | Chemical safety; SVHC disclosure; restricted substances. |
| **Recognised schemes** | Prefer **third-party** schemes: FSC, PEFC, GRS, RCS, GOTS, OEKO-TEX, Cradle to Cradle, EU Ecolabel, Blue Angel, etc. |

## Scoring model (0–100)

Score = **Gate compliance** × **Evidence pillars**.

1. Complete the **Gate checks** (A). Failures block high scores and block public claims.  
2. Score **pillars B1–B6** with the checklist.  
3. KindNesta may adjust ±5 for data quality / recency.

### Bands

| Score | Band | Meaning |
| ---: | --- | --- |
| 80–100 | Strong | Strong third-party evidence across materials, chemicals, circularity |
| 50–79 | Good | Solid evidence on main claims; some gaps |
| 0–49 | Fair | Limited evidence or important Gate issues |

---

## A. Gate checks (must complete for every SKU)

Mark **Pass / Fail / N/A**. Any **Fail** → max Kindness Score **49** until fixed, and **do not** use the related marketing claim.

| ID | Check | Pass criteria | Evidence to attach |
| --- | --- | --- | --- |
| A1 | No generic unsubstantiated claim | Product copy does **not** say “eco-friendly / green / sustainable / climate neutral” unless backed by recognised excellent performance (e.g. EU Ecolabel) or specific quantified claim | Final marketing text |
| A2 | Claims are specific | Claims name the **attribute** and **scope** (e.g. “70% post-consumer recycled PET in the bag body”, not “recycled product”) | Claim wording + Bill of Materials % |
| A3 | No self-made eco label | Any logo/score badge used externally is a **recognised certification** or clearly labelled as KindNesta’s internal score (not sold as a certification) | Label artwork policy |
| A4 | Offset-based climate claims avoided | No “carbon neutral / net zero product” based only on carbon credits | GHG statement or “none” |
| A5 | Chemical baseline | REACH compliance declared; no intentional use of restricted substances for intended EU use | REACH statement / SDS / OEKO-TEX or equivalent |
| A6 | Evidence on file | Every eco claim on the SKU maps to a document ≤ **24 months** old (or valid cert expiry) | Claim–evidence matrix |
| A7 | Trade-off honesty | Known negative trade-offs disclosed (e.g. heavier pack, animal-derived wax, virgin fibre %) | Short trade-off note |

---

## B. Evidence pillars (score these)

Each pillar: **0–20 points**. Total **120**, then scale to **100** (`round(total × 100/120)`), or use the simplified sheet in the partner CSV.

### B1 — Chemical safety & substances of concern (0–20)

| ID | Check | Points if yes |
| --- | ---: |
| B1.1 | Written REACH compliance for EU market | 5 |
| B1.2 | SVHC >0.1% w/w checked; list provided if present | 5 |
| B1.3 | Valid OEKO-TEX / GOTS chemical module / equivalent for textile components | 5 |
| B1.4 | PVC-free / intentional hazardous additive-free declaration where relevant | 5 |

### B2 — Material composition & recycled / bio-based content (0–20)

| ID | Check | Points if yes |
| --- | ---: |
| B2.1 | Full material breakdown with **% by weight** | 5 |
| B2.2 | Recycled or bio-based % stated and **method** named (pre-/post-consumer) | 5 |
| B2.3 | Third-party chain-of-custody for recycled claim (GRS / RCS / equivalent) | 7 |
| B2.4 | Virgin plastic share disclosed when product contains plastic | 3 |

### B3 — Recognised certifications & labels (0–20)

| ID | Check | Points if yes |
| --- | ---: |
| B3.1 | At least one valid third-party environmental/social cert on the product or material | 8 |
| B3.2 | Certificate number + expiry + scope match this SKU | 6 |
| B3.3 | Forest fibre/paper under FSC or PEFC CoC (if paper/board/wood) | 6 |

*(Do not award points for unverified “aligned with GOTS/GRS” language.)*

### B4 — Circularity & end-of-life (PPWR / ESPR-ready) (0–20)

| ID | Check | Points if yes |
| --- | ---: |
| B4.1 | Design-for-recycling described (mono-material or separable components) | 5 |
| B4.2 | Preferred end-of-life route stated (recycle / compost industrial / reuse) | 5 |
| B4.3 | For packaging SKUs: recyclability intent documented toward PPWR grades (A/B/C path) | 5 |
| B4.4 | Reuse / refill suitability stated where relevant | 5 |

### B5 — Packaging of the shipped product (0–20)

| ID | Check | Points if yes |
| --- | ---: |
| B5.1 | Primary pack material + weight disclosed | 5 |
| B5.2 | Plastic packaging recycled-content % disclosed (or “no plastic pack”) | 5 |
| B5.3 | Unnecessary void/overpack avoided or justified | 5 |
| B5.4 | Pack labelled for sorting where required / planned | 5 |

### B6 — Traceability & DPP-ready data (0–20)

| ID | Check | Points if yes |
| --- | ---: |
| B6.1 | Country of manufacture stated | 4 |
| B6.2 | Tier-1 supplier identified | 4 |
| B6.3 | Origin of main raw material stated (country / region) | 4 |
| B6.4 | Unique SKU + batch/lot traceability possible | 4 |
| B6.5 | Care / use / end-of-life instructions available for the product type | 4 |

---

## C. Documents partners must prepare (evidence pack)

For each SKU (or parent product family):

1. Material Bill of Materials (% by weight)  
2. Valid certificates (PDF) + scope page  
3. REACH / restricted substances statement  
4. Recycled-content calculation method (if claimed)  
5. Packaging specification (materials, weights)  
6. Country of manufacture + Tier-1 supplier name  
7. Claim list: exact phrases you want KindNesta to publish  
8. Trade-off / limitation note  

---

## D. How KindNesta uses this

1. Partner fills **`partner-score-checklist.csv`** (one row per SKU).  
2. KindNesta validates Gate checks (A).  
3. Pillar points → Kindness Score 0–100.  
4. Public site shows score + notes; only **specific, evidenced** claims appear in copy.  
5. Re-score when certs expire or materials change (≤ 24 months / on change).

## E. Partner files

- Checklist CSV: `data/partner-score-checklist.csv`  
- Product listing + score template: `data/partner-product-template.csv`  
- How-to: `data/PARTNER-TEMPLATE.md`
