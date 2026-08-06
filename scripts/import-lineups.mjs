/**
 * Append SS26/SS27 apparel lineups + sustainable home products to psp-catalog.csv.
 * Run: node scripts/import-lineups.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'data/psp-catalog.csv');

function lineupImagePath(id) {
  if (id.startsWith('gg-')) return `/images/products/apparel/${id}.png`;
  if (id.startsWith('bh-')) return `/images/products/home/${id}.png`;
  return '';
}

function esc(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function row(obj) {
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
  return headers.map((h) => esc(obj[h] ?? '')).join(',');
}

function apparel({
  id,
  sku,
  title,
  subcategory,
  collection,
  season,
  shortDescription,
  bullets,
  score = 48,
  scoreNotes = 'Provisional — awaiting GOTS/OEKO-TEX and mill certificates from supplier.',
  featured = false,
  related = [],
}) {
  return {
    id,
    sku,
    title: `${title} — ${collection}`,
    brand: 'Globgrid',
    category: 'apparel',
    subcategory,
    shortDescription,
    bulletPoints: bullets.join('|'),
    description: `${shortDescription} Part of ${collection} (${season}). Illustrative templated icon until supplier photography is available.`,
    materials: 'Cotton jersey / interlock — composition TBC with supplier',
    image: lineupImagePath(id),
    imageGallery: lineupImagePath(id),
    kindnessScore: score,
    kindnessScoreNotes: scoreNotes,
    ecoTags: 'provisional-score|organic-cotton-tbc',
    searchKeywords: [
      collection.toLowerCase().replace(/\s+/g, '-'),
      subcategory.toLowerCase().replace(/\s+/g, '-'),
      season.toLowerCase(),
      sku.toLowerCase(),
      'baby',
      'girls',
      'boys',
      'apparel',
    ]
      .filter(Boolean)
      .join('|'),
    relatedIds: related.join('|'),
    featured: featured ? 'TRUE' : 'FALSE',
    inStock: 'TRUE',
    currency: 'EUR',
    priceBasis: 'ex-works',
    unit: 'piece',
    productFamily: collection,
    scoreVerified: 'FALSE',
  };
}

function homeProduct({
  id,
  sku,
  title,
  subcategory,
  shortDescription,
  bullets,
  materials,
  dimensions,
  weight,
  price,
  score,
  scoreNotes,
  ecoTags,
  keywords,
  featured = false,
}) {
  return {
    id,
    sku,
    title,
    brand: 'KindNesta Partner',
    category: subcategory === 'Hotel amenities' ? 'home' : subcategory.includes('bag') ? 'bags' : subcategory.includes('Tooth') || subcategory.includes('Loofah') || subcategory.includes('Razor') ? 'personal-care' : 'home',
    subcategory,
    shortDescription,
    bulletPoints: bullets.join('|'),
    description: `${shortDescription} Ex-works pricing in INR from supplier price list.`,
    materials,
    dimensions,
    weight,
    image: lineupImagePath(id),
    imageGallery: lineupImagePath(id),
    kindnessScore: score,
    kindnessScoreNotes: scoreNotes,
    ecoTags: ecoTags.join('|'),
    searchKeywords: keywords.join('|'),
    featured: featured ? 'TRUE' : 'FALSE',
    inStock: 'TRUE',
    price,
    currency: 'INR',
    priceBasis: 'ex-works',
    unit: 'piece',
    moq: 100,
    productFamily: subcategory,
    scoreVerified: 'FALSE',
  };
}

const maCherie = 'SS26 Ma Cherie Newborn Girls';
const myFirstGirls = 'SS26 My First Girls';
const miniGirls = 'SS26 Mini Girls Island Charm';
const vintage = 'SS26 Vintage Doll House';
const sunny = 'SS26 Sunny Orchard Baby Essentials';
const boys = 'SS27 My First Boys Classic';

const apparelRows = [
  apparel({
    id: 'gg-ma-cherie-bodysuit-2pk-hanger',
    sku: 'AX83101',
    title: 'Bodysuit 2pk Hanger',
    subcategory: 'Newborn bodysuits',
    collection: maCherie,
    season: 'SS26',
    shortDescription: 'Two-pack newborn bodysuits on hanger — cherry print and plain.',
    bullets: ['2-pack on hanger', 'Cherry & bow print + plain', 'Newborn girls'],
    featured: true,
    related: ['gg-ma-cherie-integral-bodysuit-2pk', 'gg-ma-cherie-legging-2pk'],
  }),
  apparel({
    id: 'gg-ma-cherie-integral-bodysuit-2pk',
    sku: 'AX83101-DRESS',
    title: '2pk Integral Bodysuit Dress',
    subcategory: 'Newborn rompers',
    collection: maCherie,
    season: 'SS26',
    shortDescription: 'Two dress-style integral bodysuits — cherry print and dot ruffle.',
    bullets: ['Dress-style integral bodysuit', 'Cherry print + dot pattern', '2-pack'],
    related: ['gg-ma-cherie-bodysuit-2pk-hanger'],
  }),
  apparel({
    id: 'gg-ma-cherie-legging-2pk',
    sku: 'AX8106',
    title: '2pk Legging',
    subcategory: 'Newborn leggings',
    collection: maCherie,
    season: 'SS26',
    shortDescription: 'Two-pack baby leggings — soft pink rib and cream dot print.',
    bullets: ['2-pack leggings', 'Rib + dot print', 'Mix-and-match with Ma Cherie'],
  }),
  apparel({
    id: 'gg-ma-cherie-bodysuit-cherry-2pk',
    sku: 'AX84001-BS',
    title: '2pk Bodysuit',
    subcategory: 'Newborn bodysuits',
    collection: maCherie,
    season: 'SS26',
    shortDescription: 'Two-pack short-sleeve bodysuits — cherry appliqué and dot print.',
    bullets: ['Cherry appliqué bodysuit', 'Dot print bodysuit', '2-pack'],
  }),
  apparel({
    id: 'gg-ma-cherie-two-piece-dress',
    sku: 'AX84001-DRESS',
    title: 'Two Piece Dress Set',
    subcategory: 'Newborn sets',
    collection: maCherie,
    season: 'SS26',
    shortDescription: 'Long-sleeve cherry top with pink ruffle skirt — two-piece dress set.',
    bullets: ['Long-sleeve top with cherry motif', 'Pink ruffle skirt', 'Two-piece set'],
  }),

  apparel({
    id: 'gg-mfg-bodysuit',
    sku: 'AZ51401',
    title: 'MFG Co Bodysuit',
    subcategory: 'Baby bodysuits',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Long-sleeve tan bodysuit with chest graphic — My First Girls contemporary.',
    bullets: ['Long sleeve', 'Chest graphic', 'Earth-tone palette'],
    featured: true,
  }),
  apparel({
    id: 'gg-mfg-romper-1pk',
    sku: 'AXS5301',
    title: 'Baby Essentials Romper 1pk',
    subcategory: 'Baby rompers',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Short-sleeve romper with shoulder ruffles and animal outline print.',
    bullets: ['Shoulder ruffles', 'All-over animal print', '1-pack'],
  }),
  apparel({
    id: 'gg-mfg-sleepsuit-footless-1pk',
    sku: 'AX55501',
    title: 'MFG Sleepsuit Footless 1pk',
    subcategory: 'Sleepsuits',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Short-sleeve footless sleepsuit with animal outline print.',
    bullets: ['Footless', 'Short sleeve', 'Animal print'],
  }),
  apparel({
    id: 'gg-be-sleepsuit-footless-1pk',
    sku: 'AX54401',
    title: 'Baby Essentials Sleepsuit Footless 1pk',
    subcategory: 'Sleepsuits',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Long-sleeve footless sleepsuit with animal outline print.',
    bullets: ['Footless', 'Long sleeve', 'Animal print'],
  }),
  apparel({
    id: 'gg-mfg-leggings-2pk',
    sku: 'AZZ53301',
    title: 'MFG Co Leggings 2pk',
    subcategory: 'Leggings',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Two-pack leggings — solid tan and star print.',
    bullets: ['2-pack', 'Solid + star print', 'Soft jersey'],
  }),
  apparel({
    id: 'gg-be-2pk-3s-set',
    sku: 'AXS4901',
    title: 'Baby Essentials 2pk 3-Piece Set',
    subcategory: 'Sets',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Two three-piece sets — long-sleeve top and pants in print and graphic combos.',
    bullets: ['2 x 3-piece sets', 'Top + pants', 'Animal and star prints'],
  }),
  apparel({
    id: 'gg-be-3pk-footless-sleepsuit',
    sku: 'AX33901',
    title: '3pk Footless Sleepsuit',
    subcategory: 'Sleepsuits',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Three-pack footless sleepsuits — solid, animal, and star prints.',
    bullets: ['3-pack', 'Footless', 'Mixed prints'],
  }),
  apparel({
    id: 'gg-be-3pk-bodysuit',
    sku: 'AX52901',
    title: '3pk Bodysuit',
    subcategory: 'Baby bodysuits',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Three-pack short-sleeve bodysuits in animal, star, and solid.',
    bullets: ['3-pack', 'Short sleeve', 'Essentials palette'],
  }),
  apparel({
    id: 'gg-mfg-cardigan-bottom-hat-set',
    sku: 'SET-BSH-LEGG-HAT',
    title: 'Cardigan + Bottom + Hat Set',
    subcategory: 'Sets',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Multi-piece set with bow-neck top, star bottoms, and coordinating hat.',
    bullets: ['Cardigan-style top', 'Star print bottoms', 'Hat included'],
  }),
  apparel({
    id: 'gg-mfg-cardigan-top-bodysuit-set',
    sku: 'SET-BSKTEE-LEGG',
    title: 'Cardigan + Top + Bodysuit Set',
    subcategory: 'Sets',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Wrap cardigan, graphic long-sleeve top, and animal-print leggings.',
    bullets: ['Wrap cardigan', 'Graphic top', 'Patterned leggings'],
  }),
  apparel({
    id: 'gg-mfg-2pk-bandana-bib',
    sku: 'MFG-BIB-2PK',
    title: '2pk Bandana Bib',
    subcategory: 'Accessories',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Two triangular bandana bibs with animal outline print.',
    bullets: ['2-pack', 'Bandana style', 'Animal print'],
  }),
  apparel({
    id: 'gg-mfg-2pk-mitts',
    sku: 'AX44001',
    title: '2pk Mitts',
    subcategory: 'Accessories',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Two pairs baby mittens — striped tan and star print.',
    bullets: ['2-pack', 'Soft jersey', 'Newborn-friendly'],
  }),
  apparel({
    id: 'gg-mfg-2pk-hats',
    sku: 'AX43701',
    title: '2pk Hats',
    subcategory: 'Accessories',
    collection: myFirstGirls,
    season: 'SS26',
    shortDescription: 'Two baby beanies with bow detail — animal and star prints.',
    bullets: ['2-pack beanies', 'Bow detail', 'Matching prints'],
  }),

  apparel({
    id: 'gg-mini-graphic-tee-3pk',
    sku: 'AZ26301',
    title: 'Graphic T-Shirt 3pk',
    subcategory: 'Tops',
    collection: miniGirls,
    season: 'SS26',
    shortDescription: 'Three short-sleeve tees — floral print, line-art flower, and placement floral.',
    bullets: ['3-pack tees', 'Contrast neckbands', 'Island Charm palette'],
    featured: true,
  }),
  apparel({
    id: 'gg-mini-ribbed-bike-shorts-3pk',
    sku: 'AZ24901',
    title: 'Ribbed Bike Shorts 3pk',
    subcategory: 'Shorts',
    collection: miniGirls,
    season: 'SS26',
    shortDescription: 'Three ribbed mid-thigh bike shorts — sage, coral, and white.',
    bullets: ['3-pack', 'Rib knit', 'Elastic waist'],
  }),
  apparel({
    id: 'gg-mini-ruffle-tank-3pk',
    sku: 'AZ26401',
    title: 'Ruffle-Hem Tank 3pk',
    subcategory: 'Tops',
    collection: miniGirls,
    season: 'SS26',
    shortDescription: 'Three ribbed tank tops with lettuce-edge ruffle hem.',
    bullets: ['3-pack tanks', 'Ruffle hem', 'Summer colours'],
  }),
  apparel({
    id: 'gg-mini-ruffle-shorts-3pk',
    sku: 'AZ25901',
    title: 'Ruffled Drawstring Shorts 3pk',
    subcategory: 'Shorts',
    collection: miniGirls,
    season: 'SS26',
    shortDescription: 'Three loose shorts with ruffled hem and drawstring bow.',
    bullets: ['3-pack', 'Ruffled hem', 'Floral + solids'],
  }),
  apparel({
    id: 'gg-mini-puff-sleeve-tee',
    sku: 'AZ26501',
    title: 'Puffed-Sleeve Graphic Tee',
    subcategory: 'Tops',
    collection: miniGirls,
    season: 'SS26',
    shortDescription: 'Coral tee with gathered sleeves and multi-flower chest graphic.',
    bullets: ['Puffed sleeves', 'Floral graphic', 'Soft jersey'],
  }),
  apparel({
    id: 'gg-mini-green-graphic-tee',
    sku: 'AZ26801',
    title: 'Sage Graphic Tee',
    subcategory: 'Tops',
    collection: miniGirls,
    season: 'SS26',
    shortDescription: 'Sage green tee with contrast neckband and white line-art flower.',
    bullets: ['Contrast neckband', 'Line-art floral', 'Short sleeve'],
  }),
  apparel({
    id: 'gg-mini-floral-ruffle-dress',
    sku: 'AZ25601',
    title: 'Floral Ruffle-Hem Dress',
    subcategory: 'Dresses',
    collection: miniGirls,
    season: 'SS26',
    shortDescription: 'Sleeveless A-line dress with ruffle hem and hip bow — all-over floral.',
    bullets: ['Sleeveless dress', 'Ruffle hem', 'Bow detail'],
  }),

  apparel({
    id: 'gg-vintage-doll-house-8pc',
    sku: 'BA13201',
    title: '8pc Newborn Girls Gift Set',
    subcategory: 'Gift sets',
    collection: vintage,
    season: 'SS26',
    shortDescription: 'Eight-piece newborn set — dress, bib, mitts, coverall, bodysuit, top, pants, and hat.',
    bullets: [
      'Dress with scalloped hem',
      'Floral bib and mitts',
      'Rocking-horse graphic coverall',
      '8-piece coordinated set',
    ],
    featured: true,
    score: 50,
  }),

  apparel({
    id: 'gg-sunny-orchard-2pc-set',
    sku: 'GG26377',
    title: 'Long-Sleeve Top & Pant Set',
    subcategory: 'Sets',
    collection: sunny,
    season: 'SS26',
    shortDescription: 'Two-piece set with floral button cardigan top and matching pants.',
    bullets: ['Cardigan-style top', 'Matching pants', 'Peach floral print'],
    featured: true,
  }),
  apparel({
    id: 'gg-sunny-orchard-aio-hat-mitt',
    sku: 'GG26400',
    title: 'AIO Sleepsuit with Hat & Mitt',
    subcategory: 'Sleepsuits',
    collection: sunny,
    season: 'SS26',
    shortDescription: 'Footless zip sleepsuit with large peach botanical print plus hat and mittens.',
    bullets: ['Zip-through AIO', 'Coordinating hat', 'Mittens included'],
  }),
  apparel({
    id: 'gg-sunny-orchard-3pk-aio',
    sku: 'GG26331A',
    title: '3pk Footed AIO',
    subcategory: 'Sleepsuits',
    collection: sunny,
    season: 'SS26',
    shortDescription: 'Three long-sleeve footed sleepsuits — botanical, floral chest, and stripe fruit.',
    bullets: ['3-pack footed AIO', 'Shoulder ruffles', 'Mixed orchard prints'],
  }),
];

const boysTypes = [
  ['gg-mfb-interlock-aio-1pk', 'SS27-MFB-AIO-1', 'Interlock AIO 1pk', 'All-in-ones'],
  ['gg-mfb-interlock-aio-2pk', 'SS27-MFB-AIO-2', 'Interlock AIO 2pk', 'All-in-ones'],
  ['gg-mfb-interlock-pj-set', 'SS27-MFB-PJ-1', 'Interlock PJ Set 1pk', 'Sleepwear'],
  ['gg-mfb-tee-loopback-bottom-set', 'SS27-MFB-SET-TLB', 'Tee + Loop Back Bottom Set', 'Sets'],
  ['gg-mfb-single-jersey-tee-1pk', 'SS27-MFB-TEE-1', 'Single Jersey Tee 1pk', 'Tops'],
  ['gg-mfb-single-jersey-tee-2pk', 'SS27-MFB-TEE-2', 'Single Jersey Tee 2pk', 'Tops'],
  ['gg-mfb-tee-3pk', 'SS27-MFB-TEE-3', 'Tee 3pk', 'Tops'],
  ['gg-mfb-interlock-romper-2pk', 'SS27-MFB-ROM-2', 'Interlock Romper 2pk', 'Rompers'],
  ['gg-mfb-sleeveless-tee-shorts-set', 'SS27-MFB-SET-STS', 'Sleeveless Tee + Loop Back Shorts Set', 'Sets'],
  ['gg-mfb-legging-3pk', 'SS27-MFB-LEG-3', 'Legging 3pk', 'Leggings'],
  ['gg-mfb-grow-on-legging-feet-3pk', 'SS27-MFB-GOL-3', 'Grow-on Legging with Feet 3pk', 'Leggings'],
  ['gg-mfb-mitt-3pk', 'SS27-MFB-MITT-3', 'Mitt 3pk', 'Accessories'],
  ['gg-mfb-shawl-1pk', 'SS27-MFB-SHAWL-1', 'Shawl 1pk', 'Accessories'],
  ['gg-mfb-bib-3pk', 'SS27-MFB-BIB-3', 'Bib 3pk', 'Accessories'],
  ['gg-mfb-jogger-set', 'SS27-MFB-JOG-SET', 'Loop Back Turn-up Jogger Set', 'Sets'],
  ['gg-mfb-jogger-2pk', 'SS27-MFB-JOG-2', 'Jogger 2pk', 'Bottoms'],
  ['gg-mfb-gift-hanger-6pk', 'SS27-MFB-GIFT-H6', '6pk Gift Hanger Set', 'Gift sets'],
  ['gg-mfb-gift-box-6pk', 'SS27-MFB-GIFT-B6', '6pk Gift Box Set', 'Gift sets'],
  ['gg-mfb-legging-feet', 'SS27-MFB-LEG-FT', 'Legging with Feet', 'Leggings'],
  ['gg-mfb-blanket', 'SS27-MFB-BLANKET', 'Blanket', 'Accessories'],
  ['gg-mfb-hat', 'SS27-MFB-HAT', 'Hat', 'Accessories'],
  ['gg-mfb-bodysuit-2layer-bib', 'SS27-MFB-BS-BIB', 'Bodysuit 2-Layer Bib', 'Bodysuits'],
  ['gg-mfb-tee-hs', 'SS27-MFB-TEE-HS', 'Long-Sleeve Tee', 'Tops'],
  ['gg-mfb-gift-box-4pk', 'SS27-MFB-GIFT-B4', '4pk Gift Box Set', 'Gift sets'],
  ['gg-mfb-gift-set-3pk', 'SS27-MFB-GIFT-3', '3pk Gift Set', 'Gift sets'],
  ['gg-mfb-tee-dungaree-set', 'SS27-MFB-SET-TD', 'Tee + Dungaree Set', 'Sets'],
  ['gg-mfb-woven-pj-set', 'SS27-MFB-PJ-WOVEN', 'Woven Shirt + Shorts PJ Set', 'Sleepwear'],
  ['gg-mfb-chambray-shorts', 'SS27-MFB-SHORT-CH', 'Chambray Shorts', 'Bottoms'],
  ['gg-mfb-bodysuit-3pk', 'SS27-MFB-BS-3', 'Bodysuit 3pk', 'Bodysuits'],
];

const boysRows = boysTypes.map(([id, sku, title, subcategory], i) =>
  apparel({
    id,
    sku,
    title,
    subcategory,
    collection: boys,
    season: 'SS27',
    shortDescription: `${title} from the My First Boys Classic range — sky, snow white, and cashmere blue palette.`,
    bullets: [title, 'SS27 boys classic', 'Sky / white / blue palette'],
    featured: i === 0,
    related: boysTypes.slice(0, 3).map(([rid]) => rid),
  }),
);

const bambooRows = [
  ['bh-bamboo-mobile-stand', 'BH-001', 'Bamboo Mobile Stand', 225, '8 × 0.8 × 14 cm', '103.8 g', 'Bamboo'],
  ['bh-bamboo-bottle-500ml', 'BH-002', 'Bamboo Bottle 500ml', 475, '20.5 × 6.7 × 6.7 cm', '260 g', 'Bamboo'],
  ['bh-bamboo-toothbrush-adult', 'BH-003', 'Bamboo Toothbrush (Adult)', 25, '19 × 1 × 0.5 cm', '8.6 g', 'Bamboo bristles TBC'],
  ['bh-bamboo-brush-holder', 'BH-004', 'Bamboo Brush Holder', 60, 'H 4 × W 3 cm', '23.6 g', 'Bamboo'],
  ['bh-bamboo-cup-350ml', 'BH-005', 'Bamboo Cup 350ml', 475, '10 × 8 × 8 cm', '165 g', 'Bamboo'],
  ['bh-neem-pintail-comb', 'BH-006', 'Neem Wood Pintail Comb', 50, '24 × 4 × 1 cm', '26.2 g', 'Neem wood'],
  ['bh-neem-pocket-comb', 'BH-007', 'Neem Wood Pocket Comb', 40, '13 × 3 × 0.5 cm', '11.8 g', 'Neem wood'],
  ['bh-cork-calendar', 'BH-008', 'Cork Calendar', 375, '12.6 × 4 × 5.6 cm', '80 g', 'Cork'],
  ['bh-bamboo-diary', 'BH-009', 'Bamboo Diary', 490, '21 × 13.7 × 2 cm', '359 g', 'Bamboo cover'],
  ['bh-bamboo-stapler', 'BH-010', 'Bamboo Stapler', 275, '9.5 × 2 × 3.5 cm', '81.4 g', 'Bamboo'],
  ['bh-bamboo-notebook', 'BH-011', 'Bamboo Notebook', 40, '20.5 × 14 × 0.2 cm', '40 g', 'Bamboo / paper'],
  ['bh-bamboo-pencil-box', 'BH-012', 'Bamboo Pencil Box', 120, '18.5 × 8 × 1 cm', '75 g', 'Bamboo'],
  ['bh-bamboo-pen', 'BH-013', 'Bamboo Pen', 35, 'H 13.5 cm', '7 g', 'Bamboo'],
  ['bh-bamboo-kids-toothbrush', 'BH-014', 'Bamboo Kids Toothbrush', 22, '14.5 × 1 × 0.5 cm', '4.6 g', 'Bamboo'],
  ['bh-natural-loofah', 'BH-015', 'Natural Loofah', 35, '11.5 × 11.5 cm', '8.2 g', 'Natural loofah'],
  ['bh-plantable-notebook', 'BH-016', 'Plantable Notebook', 60, '17.5 × 12 × 0.3 cm', '52.8 g', 'Seed paper'],
  ['bh-plantable-pencil-5pk', 'BH-017', 'Plantable Seed Pencil 5pk', 65, 'H 18.5 cm box', '74.2 g', 'Seed paper / wood'],
  ['bh-bamboo-tongue-cleaner', 'BH-018', 'Bamboo Tongue Cleaner', 30, 'H 14 cm', '12 g', 'Bamboo'],
  ['bh-bamboo-soap-stand', 'BH-019', 'Bamboo Soap Stand', 150, '11.2 × 8 × 2 cm', '78 g', 'Bamboo'],
  ['bh-bamboo-razor', 'BH-020', 'Bamboo Razor', 60, '4 × 13 cm', '110 g', 'Bamboo handle'],
  ['bh-neem-comb-regular', 'BH-021', 'Neem Wooden Comb', 60, '18.5 × 4.5 × 0.5 cm', '48 g', 'Neem wood'],
  ['bh-bamboo-pen-pencil-stand', 'BH-022', 'Bamboo Pen & Pencil Stand', 200, '10.2 × 7 × 7 cm', '150 g', 'Bamboo'],
  ['bh-bamboo-keychain', 'BH-023', 'Bamboo Keychain', 50, 'H 5 × W 4 cm', '14 g', 'Bamboo'],
  ['bh-cork-tea-coaster', 'BH-024', 'Cork Tea Coaster', 200, 'Ø 36.5 cm', '75 g', 'Cork'],
].map(([id, sku, title, price, dimensions, weight, materials], i) =>
  homeProduct({
    id,
    sku,
    title,
    subcategory: title.includes('Tooth') || title.includes('Loofah') || title.includes('Razor') || title.includes('Tongue')
      ? 'Personal care'
      : 'Bamboo home',
    shortDescription: `Sustainable ${title.toLowerCase()} — renewable materials, plastic-free positioning.`,
    bullets: ['Renewable bamboo / wood / cork', 'Ex-works INR pricing', 'MOQ 100 units'],
    materials,
    dimensions,
    weight,
    price,
    score: title.includes('Tooth') || title.includes('Loofah') ? 78 : 72,
    scoreNotes: 'Provisional — based on renewable material claims; awaiting FSC/bristle composition docs.',
    ecoTags: ['renewable', 'plastic-free', 'biodegradable-tbc'],
    keywords: ['bamboo', 'sustainable', title.toLowerCase(), 'home'],
    featured: i === 0,
  }),
);

const bagRows = [
  ['bh-tote-zip-lined', 'CB-001', 'Tote Bag with Zip & Lined Pocket', 200, '14 × 16 in'],
  ['bh-foldable-bag-zip', 'CB-002', 'Foldable Bag with Zip', 145, '14 × 16 in'],
  ['bh-reversible-tote', 'CB-003', 'Reversible Tote Bag (2-in-1)', 225, '14 × 16 in'],
  ['bh-lunch-bag', 'CB-004', 'Lunch Bag', 120, '6 × 8 × 6 in'],
  ['bh-tote-no-zip', 'CB-005', 'Tote Bag without Zip', 100, '14 × 16 in'],
  ['bh-fridge-veggie-bag', 'CB-006', 'Fridge Veggie Bag', 25, '10 × 10 in'],
  ['bh-canvas-rangoli-tote', 'CB-007', 'Canvas Rangoli Tote Bag', 160, '14 × 16 in'],
  ['bh-peach-flower-tote', 'CB-008', 'Peach Flower Print Tote Bag', 175, '14 × 16 in'],
  ['bh-black-gold-tote', 'CB-009', 'Black Gold Print Tote Bag', 175, '14 × 16 in'],
  ['bh-grey-tote-zip', 'CB-010', 'Grey Tote Bag with Zip & Lining', 160, '14 × 16 in'],
  ['bh-sunflower-tote', 'CB-011', 'Sunflower Print Tote Bag', 175, '14 × 16 in'],
  ['bh-tribal-tote-magnetic', 'CB-012', 'Tribal Print Tote Bag', 125, '15 × 17 in'],
].map(([id, sku, title, price, dimensions], i) =>
  homeProduct({
    id,
    sku,
    title,
    subcategory: 'Cotton bags',
    shortDescription: `Reusable cotton ${title.toLowerCase()} for retail and corporate programmes.`,
    bullets: ['Reusable cotton construction', 'Custom print options on request', 'Ex-works INR pricing'],
    materials: 'Cotton canvas',
    dimensions,
    price,
    score: 68,
    scoreNotes: 'Provisional — reusable cotton; organic/recycled content TBC with mill certs.',
    ecoTags: ['reusable', 'cotton', 'plastic-free'],
    keywords: ['cotton', 'tote', 'bag', 'reusable'],
    featured: i === 0,
  }),
);

const hotelRows = [
  {
    id: 'bh-hotel-kit-basic',
    sku: 'HK-BASIC',
    title: 'Basic Hotel Amenity Kit',
    price: 85,
    bullets: ['Dental kit', 'Shaving kit', 'Comb'],
  },
  {
    id: 'bh-hotel-kit-premium',
    sku: 'HK-PREMIUM',
    title: 'Premium Hotel Amenity Kit',
    price: 125,
    bullets: ['Dental kit', 'Shaving kit', 'Comb', 'Shower cap', 'Notepad & pen', 'Vanity kit', 'Sewing kit'],
  },
  {
    id: 'bh-hotel-kit-luxury',
    sku: 'HK-LUXURY',
    title: 'Luxury Hotel Amenity Kit',
    price: 190,
    bullets: [
      'Dental kit',
      'Shaving kit',
      'Comb',
      'Shower cap',
      'Notepad & pen',
      'Vanity kit',
      'Sewing kit',
      'Loofah',
      'Slippers',
    ],
  },
].map((kit, i) =>
  homeProduct({
    id: kit.id,
    sku: kit.sku,
    title: kit.title,
    subcategory: 'Hotel amenities',
    shortDescription: `${kit.title} — bundled in-room amenities for hospitality programmes.`,
    bullets: kit.bullets,
    materials: 'Mixed — component materials on request',
    price: kit.price,
    score: 42,
    scoreNotes: 'Provisional — mixed disposable components; bamboo/recycled upgrades available on request.',
    ecoTags: ['hospitality', 'amenity-kit'],
    keywords: ['hotel', 'amenity', 'hospitality', kit.title.toLowerCase()],
    featured: i === 0,
  }),
);

const newRows = [...apparelRows, ...boysRows, ...bambooRows, ...bagRows, ...hotelRows].map((item) => {
  const imagePath = lineupImagePath(item.id);
  return imagePath
    ? {
        ...item,
        image: imagePath,
        imageGallery: imagePath,
      }
    : item;
});

const existing = readFileSync(catalogPath, 'utf8').replace(/\r?\n$/, '');
const existingIds = new Set(
  existing
    .split('\n')
    .slice(1)
    .map((line) => line.split(',')[0])
    .filter(Boolean),
);

const toAppend = newRows.filter((r) => !existingIds.has(r.id));
if (!toAppend.length) {
  console.log('No new lineup rows to append (all IDs already present).');
  process.exit(0);
}

const csv = `${existing}\n${toAppend.map(row).join('\n')}\n`;
writeFileSync(catalogPath, csv, 'utf8');
console.log(`Appended ${toAppend.length} lineup products to ${catalogPath}`);
