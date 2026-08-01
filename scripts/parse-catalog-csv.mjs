/**
 * Shared CSV catalog parser (used by Astro content config + npm run sync-catalog).
 */

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n') {
      row.push(cell);
      cell = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else if (ch !== '\r') {
      cell += ch;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    if (row.some((c) => c.trim() !== '')) rows.push(row);
  }

  return rows;
}

function truthy(value) {
  const v = String(value).trim().toLowerCase();
  return v === 'true' || v === '1' || v === 'yes' || v === 'y';
}

function num(value) {
  const t = String(value).trim();
  if (!t) return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : undefined;
}

function listField(value) {
  if (!value || !String(value).trim()) return [];
  return String(value)
    .split(/[|;]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export function parseCatalogCsv(text) {
  const rows = parseCsv(text.replace(/^\uFEFF/, ''));
  if (rows.length < 2) {
    throw new Error('Catalog CSV must include a header row and at least one product');
  }

  const headers = rows[0].map((h) => h.trim());
  const required = ['id', 'sku', 'title', 'category', 'image', 'shortDescription', 'kindnessScore'];
  for (const key of required) {
    if (!headers.includes(key)) {
      throw new Error(`Catalog CSV missing required column: ${key}`);
    }
  }

  return rows.slice(1).map((cells, index) => {
    const raw = {};
    headers.forEach((h, i) => {
      raw[h] = (cells[i] ?? '').trim();
    });

    const kindnessScore = num(raw.kindnessScore);
    if (kindnessScore === undefined) throw new Error(`Row ${index + 2}: invalid kindnessScore`);

    const price = num(raw.price);
    const moq = num(raw.moq);
    const priceBasis = raw.priceBasis || 'ex-works';
    const unit = raw.unit || 'piece';
    const gallery = listField(raw.imageGallery);
    if (raw.image && !gallery.includes(raw.image)) gallery.unshift(raw.image);

    return {
      id: raw.id,
      parentId: raw.parentId || undefined,
      sku: raw.sku,
      title: raw.title,
      brand: raw.brand || 'KindNesta',
      category: raw.category,
      subcategory: raw.subcategory || undefined,
      shortDescription: raw.shortDescription,
      bulletPoints: listField(raw.bulletPoints),
      description: raw.description || raw.shortDescription,
      materials: raw.materials || undefined,
      dimensions: raw.dimensions || undefined,
      weight: raw.weight || undefined,
      image: raw.image,
      imageGallery: gallery.length ? gallery : [raw.image],
      variantType: raw.variantType || undefined,
      variantValue: raw.variantValue || undefined,
      kindnessScore,
      kindnessScoreNotes: raw.kindnessScoreNotes || undefined,
      scoreVerified: truthy(raw.scoreVerified ?? ''),
      ecoTags: listField(raw.ecoTags),
      searchKeywords: listField(raw.searchKeywords),
      relatedIds: listField(raw.relatedIds),
      featured: truthy(raw.featured ?? ''),
      inStock: raw.inStock === undefined || raw.inStock === '' ? true : truthy(raw.inStock),
      // Internal / partner fields
      price,
      currency: raw.currency || 'EUR',
      priceBasis: priceBasis === 'suggested-retail' ? 'suggested-retail' : 'ex-works',
      unit: unit === 'meter' ? 'meter' : 'piece',
      packSize: raw.packSize || undefined,
      moq,
      quality: raw.quality || undefined,
      productFamily: raw.productFamily || undefined,
    };
  });
}
