#!/usr/bin/env node
/**
 * Validates data/psp-catalog.csv and prints a short summary.
 *
 * Usage: npm run sync-catalog
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCatalogCsv } from './parse-catalog-csv.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = resolve(root, 'data/psp-catalog.csv');

if (!existsSync(catalogPath)) {
  console.error('Missing data/psp-catalog.csv');
  process.exit(1);
}

let products;
try {
  products = parseCatalogCsv(readFileSync(catalogPath, 'utf8'));
} catch (err) {
  console.error(String(err?.message ?? err));
  process.exit(1);
}

const ids = new Set();
const skus = new Set();
const errors = [];
const parents = new Set();

for (const [i, p] of products.entries()) {
  const where = `row ${i + 2} (${p?.sku ?? p?.id ?? 'unknown'})`;
  for (const key of ['id', 'sku', 'title', 'category', 'image', 'shortDescription', 'kindnessScore']) {
    if (p[key] === undefined || p[key] === null || p[key] === '') {
      errors.push(`${where}: missing ${key}`);
    }
  }
  if (p.id) {
    if (ids.has(p.id)) errors.push(`${where}: duplicate id ${p.id}`);
    ids.add(p.id);
  }
  if (p.sku) {
    if (skus.has(p.sku)) errors.push(`${where}: duplicate sku ${p.sku}`);
    skus.add(p.sku);
  }
  if (typeof p.kindnessScore === 'number' && (p.kindnessScore < 0 || p.kindnessScore > 100)) {
    errors.push(`${where}: kindnessScore must be 0–100`);
  }
  if (p.parentId) parents.add(p.parentId);
  if (p.image?.startsWith('/images/')) {
    const imgPath = resolve(root, 'public', p.image.replace(/^\//, ''));
    if (!existsSync(imgPath)) errors.push(`${where}: image not found at public${p.image}`);
  }
}

if (errors.length) {
  console.error(`Catalog validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):\n`);
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

const byCat = {};
for (const p of products) {
  byCat[p.category] = (byCat[p.category] ?? 0) + 1;
}

console.log(`✓ Catalog OK — ${products.length} SKUs · ${parents.size} parent groups`);
for (const [cat, n] of Object.entries(byCat).sort()) {
  console.log(`  ${cat}: ${n}`);
}
console.log('\nPartner template: data/partner-product-template.csv');
console.log('Partner guide:    data/PARTNER-TEMPLATE.md');
