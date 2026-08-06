/**
 * Deduplicate psp-catalog.csv to one row per productFamily for buyer-facing catalogue.
 * Reads data/psp-catalog-full.csv (or psp-catalog.csv) and writes data/psp-catalog.csv.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parseCatalogCsv } from './parse-catalog-csv.mjs';

const source = existsSync('data/psp-catalog-full.csv')
  ? 'data/psp-catalog-full.csv'
  : 'data/psp-catalog.csv';

const text = readFileSync(source, 'utf8');
const rows = parseCatalogCsv(text);

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function cleanTitle(title) {
  return String(title)
    .replace(/\s*\(Style \d+\)\s*/gi, ' ')
    .replace(/\s*·\s*PVC-free\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const byFamily = new Map();
for (const row of rows) {
  const family = row.productFamily || row.category;
  const existing = byFamily.get(family);
  if (!existing) {
    byFamily.set(family, row);
    continue;
  }
  const score = row.kindnessScore ?? 0;
  const existingScore = existing.kindnessScore ?? 0;
  const featured = row.featured ? 1 : 0;
  const existingFeatured = existing.featured ? 1 : 0;
  if (featured > existingFeatured || (featured === existingFeatured && score > existingScore)) {
    byFamily.set(family, row);
  }
}

const deduped = [...byFamily.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([family, row]) => {
    const id = `kn-${slugify(family)}`;
    const title = cleanTitle(row.title);
    const displayTitle = title.toLowerCase().includes(family.toLowerCase())
      ? title
      : `${family} — ${title}`;

    return {
      ...row,
      id,
      parentId: undefined,
      sku: row.sku,
      title: displayTitle,
      subcategory: family,
      shortDescription: row.shortDescription,
      description: String(row.description).replace(/ Part of the KindNesta .* range\./, ''),
      image: `/images/products/kn/${id}.png`,
      imageGallery: [`/images/products/kn/${id}.png`],
      variantType: undefined,
      variantValue: undefined,
      relatedIds: [],
      featured: row.featured ?? false,
      productFamily: family,
      scoreVerified: row.scoreVerified ?? false,
    };
  });

// Link related products within the same category (up to 4)
for (const product of deduped) {
  product.relatedIds = deduped
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)
    .map((p) => p.id);
}

const headers = [
  'id',
  'parentId',
  'sku',
  'title',
  'brand',
  'category',
  'subcategory',
  'shortDescription',
  'bulletPoints',
  'description',
  'materials',
  'dimensions',
  'weight',
  'image',
  'imageGallery',
  'variantType',
  'variantValue',
  'kindnessScore',
  'kindnessScoreNotes',
  'ecoTags',
  'searchKeywords',
  'relatedIds',
  'featured',
  'inStock',
  'price',
  'currency',
  'priceBasis',
  'unit',
  'packSize',
  'moq',
  'quality',
  'productFamily',
  'scoreVerified',
];

function esc(value) {
  const s = value == null ? '' : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function serializeList(value) {
  if (Array.isArray(value)) return value.join('|');
  return value ?? '';
}

const lines = [
  headers.join(','),
  ...deduped.map((row) =>
    headers
      .map((key) => {
        if (key === 'bulletPoints' || key === 'ecoTags' || key === 'searchKeywords' || key === 'relatedIds') {
          return esc(serializeList(row[key]));
        }
        if (key === 'imageGallery') {
          return esc(serializeList(row.imageGallery));
        }
        if (key === 'featured' || key === 'inStock' || key === 'scoreVerified') {
          return row[key] ? 'TRUE' : 'FALSE';
        }
        return esc(row[key] ?? '');
      })
      .join(',')
  ),
];

writeFileSync('data/psp-catalog.csv', `${lines.join('\n')}\n`);
console.log(`Wrote ${deduped.length} products to data/psp-catalog.csv from ${rows.length} SKUs`);
