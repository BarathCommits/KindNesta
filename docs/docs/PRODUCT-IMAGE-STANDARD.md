# KindNesta product image standard

**Status:** Internal standard for catalogue imagery  
**Applies to:** All product rows in `data/psp-catalog.csv`  
**Related:** [`PRODUCT-LISTING-RULEBOOK.md`](./PRODUCT-LISTING-RULEBOOK.md)

---

## 1. Goals

1. **One AI packshot PNG per SKU** — same commercial style as KindNesta `kn-*` images (labels, tapes, elastics, hangers).
2. **No original range sheets / PDF crops** for lineup products.
3. Honest placeholder copy until supplier photography arrives.

---

## 2. Visual standard (match `kn-*`)

| Rule | Detail |
| --- | --- |
| Background | Seamless pure white |
| Lighting | Soft diffused studio light |
| Shadow | Subtle realistic contact shadow only |
| Framing | Single product (or intentional pack) centered |
| Look | Photorealistic catalogue packshot — clear material texture |
| Forbidden in frame | Text overlays, watermarks, logos, collage sheets, UI chrome |

Aspect: landscape packshot (~4:3 / 1536×1024 class), cards crop with `object-fit: cover`.

---

## 3. Paths

| Prefix | Format | Path |
| --- | --- | --- |
| `kn-*` | PNG packshot | `/images/products/kn/{id}.png` |
| `gg-*` | AI PNG packshot | `/images/products/apparel/{id}.png` |
| `bh-*` | AI PNG packshot | `/images/products/home/{id}.png` |

Catalogue `image` / `imageGallery` must use `.png` with `?v=` cache-bust.

---

## 4. Forbidden

- Original range sheets / PDF page crops / `crops/`
- Shared collage images across SKUs
- Flat SVG wireframe “template icons” in the catalogue image slot

---

## 5. Copy

**“Illustrative AI-generated packshot until supplier photography is available.”**
