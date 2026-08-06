import { mkdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'data/psp-catalog.csv');
const productsRoot = path.join(root, 'public', 'images', 'products');
const assetVersion = 'ai-20260806-1205';
const iconOverrides = {
  // Ma Cherie
  'gg-ma-cherie-bodysuit-2pk-hanger': 'bodysuithanger',
  'gg-ma-cherie-bodysuit-cherry-2pk': 'bodysuitss',
  'gg-ma-cherie-integral-bodysuit-2pk': 'dress',
  'gg-ma-cherie-legging-2pk': 'bottom',
  'gg-ma-cherie-two-piece-dress': 'dress',
  // My First Girls / Baby Essentials
  'gg-mfg-bodysuit': 'bodysuit',
  'gg-mfg-romper-1pk': 'bodysuitss',
  'gg-mfg-sleepsuit-footless-1pk': 'bodysuit',
  'gg-be-sleepsuit-footless-1pk': 'bodysuit',
  'gg-mfg-leggings-2pk': 'bottom',
  'gg-be-2pk-3s-set': 'set',
  'gg-be-3pk-footless-sleepsuit': 'bodysuit',
  'gg-be-3pk-bodysuit': 'bodysuitss',
  'gg-mfg-cardigan-bottom-hat-set': 'cardiganset',
  'gg-mfg-cardigan-top-bodysuit-set': 'layeredset',
  'gg-mfg-2pk-bandana-bib': 'bib',
  'gg-mfg-2pk-mitts': 'mitts',
  'gg-mfg-2pk-hats': 'hat',
  // Mini Girls
  'gg-mini-ribbed-bike-shorts-3pk': 'shorts',
  'gg-mini-ruffle-shorts-3pk': 'shorts',
  'gg-mini-floral-ruffle-dress': 'dress',
  'gg-mini-graphic-tee-3pk': 'tee',
  'gg-mini-ruffle-tank-3pk': 'tank',
  'gg-mini-puff-sleeve-tee': 'tee',
  'gg-mini-green-graphic-tee': 'tee',
  // Sunny Orchard / Vintage
  'gg-sunny-orchard-2pc-set': 'cardiganset',
  'gg-sunny-orchard-aio-hat-mitt': 'bodysuit',
  'gg-sunny-orchard-3pk-aio': 'bodysuit',
  'gg-vintage-doll-house-8pc': 'set',
  // My First Boys
  'gg-mfb-interlock-aio-1pk': 'bodysuit',
  'gg-mfb-interlock-aio-2pk': 'bodysuit',
  'gg-mfb-interlock-pj-set': 'pjset',
  'gg-mfb-tee-loopback-bottom-set': 'teeset',
  'gg-mfb-single-jersey-tee-1pk': 'tee',
  'gg-mfb-single-jersey-tee-2pk': 'tee',
  'gg-mfb-tee-3pk': 'tee',
  'gg-mfb-interlock-romper-2pk': 'bodysuitss',
  'gg-mfb-sleeveless-tee-shorts-set': 'sleevelessset',
  'gg-mfb-legging-3pk': 'bottom',
  'gg-mfb-grow-on-legging-feet-3pk': 'feetbottom',
  'gg-mfb-mitt-3pk': 'mitts',
  'gg-mfb-shawl-1pk': 'shawl',
  'gg-mfb-bib-3pk': 'bib',
  'gg-mfb-jogger-set': 'teeset',
  'gg-mfb-jogger-2pk': 'bottom',
  'gg-mfb-gift-hanger-6pk': 'gifthanger',
  'gg-mfb-gift-box-6pk': 'giftbox',
  'gg-mfb-legging-feet': 'feetbottom',
  'gg-mfb-blanket': 'blanket',
  'gg-mfb-hat': 'hat',
  'gg-mfb-bodysuit-2layer-bib': 'bodysuitss',
  'gg-mfb-tee-hs': 'longtee',
  'gg-mfb-gift-box-4pk': 'giftbox',
  'gg-mfb-gift-set-3pk': 'giftbox',
  'gg-mfb-tee-dungaree-set': 'dungaree',
  'gg-mfb-woven-pj-set': 'wovenpj',
  'gg-mfb-chambray-shorts': 'shorts',
  'gg-mfb-bodysuit-3pk': 'bodysuitss',
  // Home / personal care
  'bh-bamboo-brush-holder': 'brushholder',
  'bh-bamboo-pen-pencil-stand': 'penstand',
  'bh-bamboo-diary': 'diary',
  'bh-cork-calendar': 'calendar',
  'bh-bamboo-notebook': 'notebook',
  'bh-plantable-notebook': 'notebook',
  'bh-plantable-pencil-5pk': 'desk',
  'bh-bamboo-pen': 'pen',
  'bh-bamboo-pencil-box': 'pencilbox',
  'bh-bamboo-mobile-stand': 'stand',
  'bh-bamboo-keychain': 'keychain',
  'bh-bamboo-stapler': 'stapler',
  'bh-bamboo-toothbrush-adult': 'toothbrush',
  'bh-bamboo-kids-toothbrush': 'toothbrush',
  'bh-bamboo-tongue-cleaner': 'tongue',
  'bh-bamboo-razor': 'razor',
  'bh-bamboo-soap-stand': 'soapstand',
  'bh-natural-loofah': 'loofah',
  'bh-neem-pintail-comb': 'comb',
  'bh-neem-pocket-comb': 'comb',
  'bh-neem-comb-regular': 'comb',
  'bh-bamboo-bottle-500ml': 'bottle',
  'bh-bamboo-cup-350ml': 'cup',
  'bh-cork-tea-coaster': 'care',
  'bh-tote-zip-lined': 'bag',
  'bh-tote-no-zip': 'bag',
  'bh-foldable-bag-zip': 'foldablebag',
  'bh-reversible-tote': 'bag',
  'bh-lunch-bag': 'lunchbag',
  'bh-fridge-veggie-bag': 'veggiebag',
  'bh-canvas-rangoli-tote': 'bag',
  'bh-peach-flower-tote': 'bag',
  'bh-black-gold-tote': 'bag',
  'bh-grey-tote-zip': 'bag',
  'bh-sunflower-tote': 'bag',
  'bh-tribal-tote-magnetic': 'bag',
  'bh-hotel-kit-basic': 'hotel',
  'bh-hotel-kit-premium': 'hotel',
  'bh-hotel-kit-luxury': 'hotel',
};

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
      if (row.some((part) => part.trim() !== '')) rows.push(row);
      row = [];
    } else if (ch !== '\r') {
      cell += ch;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    if (row.some((part) => part.trim() !== '')) rows.push(row);
  }

  return rows;
}

function escCsv(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function escXml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function hashValue(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 1000003;
  }
  return hash;
}

function slugImagePath(row) {
  if (row.id.startsWith('gg-')) return `/images/products/apparel/${row.id}.png`;
  if (row.id.startsWith('bh-')) return `/images/products/home/${row.id}.png`;
  return row.image;
}

function stripQuery(value) {
  return String(value || '').split('?')[0];
}

function versionedPath(value) {
  return `${stripQuery(value)}?v=${assetVersion}`;
}

function palette(row) {
  const text = `${row.productFamily} ${row.title} ${row.category}`.toLowerCase();
  if (text.includes('ma cherie')) return ['#fff7f7', '#f5ddd9', '#d68688', '#7d4c57'];
  if (text.includes('sunny orchard')) return ['#fffaf0', '#f5d4c6', '#9ab393', '#7d5a4f'];
  if (text.includes('mini girls')) return ['#fff8fb', '#f6d1dc', '#a5d5b2', '#5e6b66'];
  if (text.includes('vintage doll')) return ['#fffaf2', '#ecd8b8', '#ceb69b', '#7b695a'];
  if (text.includes('my first girls')) return ['#fcfaf6', '#ded1be', '#c7b39b', '#706458'];
  if (text.includes('my first boys')) return ['#f5f9ff', '#d7e6f7', '#94b4d8', '#48627f'];
  if (text.includes('cotton bags')) return ['#fcfaf4', '#eadfcd', '#c39462', '#6d5a4a'];
  if (text.includes('hotel')) return ['#f7f5f0', '#ddd5c9', '#b29d86', '#5d534a'];
  if (text.includes('personal care')) return ['#f8fbf6', '#dfead7', '#9ec18f', '#4c6645'];
  return ['#f8f4ea', '#eadbbd', '#c5a16a', '#5f4d34'];
}

function iconType(row) {
  if (iconOverrides[row.id]) return iconOverrides[row.id];
  const text = `${row.title} ${row.subcategory} ${row.category}`.toLowerCase();
  if (text.includes('mobile stand')) return 'stand';
  if (text.includes('brush holder') || text.includes('holder')) return 'holder';
  if (text.includes('keychain')) return 'keychain';
  if (text.includes('toothbrush')) return 'toothbrush';
  if (text.includes('tongue cleaner')) return 'tongue';
  if (text.includes('comb')) return 'comb';
  if (text.includes('razor')) return 'razor';
  if (text.includes('soap stand')) return 'soapstand';
  if (text.includes('loofah')) return 'loofah';
  if (text.includes('pen & pencil stand')) return 'holder';
  if (text.includes(' pen') || text.startsWith('pen ') || text.includes(' pen ')) return 'pen';
  if (text.includes('pencil box')) return 'pencilbox';
  if (text.includes('stapler')) return 'stapler';
  if (text.includes('diary') || text.includes('calendar')) return 'book';
  if (text.includes('notebook')) return 'notebook';
  if (text.includes('bottle')) return 'bottle';
  if (text.includes('cup')) return 'cup';
  if (text.includes('lunch bag')) return 'lunchbag';
  if (text.includes('fridge veggie')) return 'veggiebag';
  if (text.includes('foldable bag')) return 'foldablebag';
  if (text.includes('tote') || text.includes('bag')) return 'bag';
  if (text.includes('gift box')) return 'giftbox';
  if (text.includes('gift hanger')) return 'gifthanger';
  if (text.includes('blanket')) return 'blanket';
  if (text.includes('shawl')) return 'shawl';
  if (text.includes('mitt')) return 'mitts';
  if (text.includes('bib')) return 'bib';
  if (text.includes('hat') || text.includes('beanie')) return 'hat';
  if (text.includes('dungaree')) return 'dungaree';
  if (text.includes('shorts')) return 'shorts';
  if (text.includes('tank')) return 'tank';
  if (text.includes('cardigan')) return 'cardigan';
  if (text.includes('pj') || text.includes('sleepwear')) return 'sleepset';
  if (text.includes('legging with feet') || text.includes('grow-on')) return 'feetbottom';
  if (text.includes('dress')) return 'dress';
  if (text.includes('bodysuit') || text.includes('aio') || text.includes('sleepsuit') || text.includes('romper')) return 'bodysuit';
  if (text.includes('legging') || text.includes('jogger') || text.includes('pants') || text.includes('short')) return 'bottom';
  if (text.includes('tee')) return 'tee';
  if (text.includes('top') || text.includes('cardigan') || text.includes('shirt') || text.includes('shawl')) return 'top';
  if (text.includes('gift set') || text.includes('set')) return 'set';
  if (text.includes('pencil')) return 'desk';
  if (text.includes('loofah') || text.includes('soap')) return 'care';
  if (text.includes('hotel')) return 'hotel';
  return 'generic';
}

function iconSvg(type, colors) {
  const accent = colors[2];
  const line = colors[3];
  const light = colors[1];

  const icons = {
    dress: `
      <path d="M470 340h260l30 95 72 50-44 64-68-34-35 197H315l-35-197-68 34-44-64 72-50 30-95h200z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M510 340c8 46 42 76 90 76s82-30 90-76" fill="none" stroke="${line}" stroke-width="10"/>
      <path d="M325 712h350" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    bodysuit: `
      <path d="M420 300h180l66 58-34 58-52-31v126l88 170-94 44-68-133h-12l-68 133-94-44 88-170V385l-52 31-34-58 66-58z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <circle cx="510" cy="628" r="8" fill="${accent}"/><circle cx="600" cy="628" r="8" fill="${accent}"/>
      <path d="M495 352h120" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    bottom: `
      <path d="M370 300h310l-28 390h-118l-29-171-29 171H358z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M522 300v390" stroke="${line}" stroke-width="8"/>
      <path d="M388 356h274" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    top: `
      <path d="M390 350l96-54h80l96 54 78 44-42 76-68-38v264H414V432l-68 38-42-76z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M484 296c12 38 40 56 78 56s66-18 78-56" fill="none" stroke="${line}" stroke-width="10"/>
      <path d="M454 520c56-24 112-24 168 0" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    hat: `
      <path d="M312 570c42-140 136-232 210-232s168 92 210 232z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <rect x="292" y="560" width="460" height="72" rx="28" fill="${accent}" opacity="0.25" stroke="${line}" stroke-width="10"/>
      <path d="M398 560c32-40 74-60 124-60s92 20 124 60" fill="none" stroke="${accent}" stroke-width="10"/>
    `,
    mitts: `
      <path d="M390 640c-36-40-54-92-46-148 8-60 48-114 104-114 26 0 46 12 60 28v262c-56 10-84 2-118-28z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M654 640c36-40 54-92 46-148-8-60-48-114-104-114-26 0-46 12-60 28v262c56 10 84 2 118-28z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M462 420h120" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    bib: `
      <path d="M522 330c90 0 164 70 164 156 0 22-4 44-12 64H370c-8-20-12-42-12-64 0-86 74-156 164-156z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <circle cx="522" cy="390" r="52" fill="#ffffff" stroke="${line}" stroke-width="8"/>
      <path d="M370 550h304l-34 128H404z" fill="${accent}" opacity="0.22" stroke="${line}" stroke-width="10"/>
    `,
    set: `
      <rect x="282" y="358" width="204" height="230" rx="24" fill="${light}" stroke="${line}" stroke-width="10"/>
      <rect x="558" y="310" width="204" height="278" rx="24" fill="#ffffff" opacity="0.7" stroke="${line}" stroke-width="10"/>
      <path d="M322 402h124m-124 50h124m276-96v186" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
      <path d="M598 370l124 164M722 370 598 534" stroke="${accent}" stroke-width="10"/>
    `,
    bag: `
      <path d="M338 380h368l-28 334H366z" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M430 380c0-76 44-124 92-124s92 48 92 124" fill="none" stroke="${line}" stroke-width="10"/>
      <rect x="418" y="470" width="208" height="148" rx="18" fill="${accent}" opacity="0.22"/>
    `,
    bottle: `
      <rect x="438" y="230" width="168" height="86" rx="20" fill="${accent}" opacity="0.25" stroke="${line}" stroke-width="10"/>
      <rect x="398" y="302" width="248" height="410" rx="56" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M440 430h164m-164 92h164" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    tool: `
      <path d="M360 634 640 354" stroke="${line}" stroke-width="28" stroke-linecap="round"/>
      <circle cx="332" cy="662" r="42" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M610 324c42-42 98-58 132-24 34 34 18 90-24 132" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round"/>
    `,
    notebook: `
      <rect x="336" y="250" width="372" height="470" rx="20" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M414 250v470" stroke="${line}" stroke-width="8"/>
      <path d="M456 360h182m-182 74h182m-182 74h182" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    desk: `
      <rect x="316" y="470" width="412" height="214" rx="20" fill="${light}" stroke="${line}" stroke-width="10"/>
      <rect x="420" y="292" width="46" height="194" rx="18" fill="#ffffff" stroke="${line}" stroke-width="10"/>
      <rect x="516" y="252" width="46" height="234" rx="18" fill="#ffffff" stroke="${line}" stroke-width="10"/>
      <path d="M350 538h344" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    care: `
      <ellipse cx="522" cy="502" rx="180" ry="146" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M522 356c40 64 92 116 92 178 0 56-40 100-92 100s-92-44-92-100c0-62 52-114 92-178z" fill="#ffffff" opacity="0.7"/>
      <path d="M522 416v180" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    hotel: `
      <rect x="286" y="516" width="474" height="172" rx="24" fill="${light}" stroke="${line}" stroke-width="10"/>
      <rect x="338" y="398" width="90" height="118" rx="16" fill="#ffffff" stroke="${line}" stroke-width="10"/>
      <rect x="470" y="420" width="72" height="96" rx="16" fill="#ffffff" stroke="${line}" stroke-width="10"/>
      <rect x="582" y="384" width="126" height="132" rx="16" fill="#ffffff" stroke="${line}" stroke-width="10"/>
      <path d="M330 570h386" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `,
    generic: `
      <circle cx="522" cy="486" r="184" fill="${light}" stroke="${line}" stroke-width="10"/>
      <path d="M428 486h188M522 392v188" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
    `,
  };

  icons.cardigan = `
    <path d="M390 350l96-54h80l96 54 78 44-42 76-68-38v264H414V432l-68 38-42-76z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M522 350v344" stroke="${line}" stroke-width="8"/>
    <circle cx="522" cy="430" r="6" fill="${accent}"/><circle cx="522" cy="474" r="6" fill="${accent}"/><circle cx="522" cy="518" r="6" fill="${accent}"/>
  `;
  icons.tank = `
    <path d="M430 314h184l44 78v306H386V392z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M472 314c6 34 22 54 50 54s44-20 50-54" fill="none" stroke="${line}" stroke-width="10"/>
    <path d="M422 618h200" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
  `;
  icons.shorts = `
    <path d="M376 320h292l-26 250H542l-20-106-20 106H402z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M522 320v250" stroke="${line}" stroke-width="8"/>
    <path d="M404 376h236" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
  `;
  icons.giftbox = `
    <rect x="334" y="360" width="376" height="300" rx="22" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M522 360v300M334 510h376" stroke="${accent}" stroke-width="12"/>
    <path d="M476 360c-28-50-12-90 28-90 22 0 34 16 18 36-14 18-36 26-46 54zm92 0c28-50 12-90-28-90-22 0-34 16-18 36 14 18 36 26 46 54z" fill="none" stroke="${line}" stroke-width="10"/>
  `;
  icons.gifthanger = `
    <rect x="366" y="404" width="312" height="236" rx="20" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M522 404v236M366 522h312" stroke="${accent}" stroke-width="12"/>
    <path d="M440 350h164" stroke="${line}" stroke-width="12" stroke-linecap="round"/>
    <path d="M522 350c0-30 18-46 42-46 18 0 32 10 38 28" fill="none" stroke="${line}" stroke-width="10"/>
  `;
  icons.foldablebag = `
    <path d="M360 402h324l-22 286H382z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M438 402c0-54 38-92 84-92s84 38 84 92" fill="none" stroke="${line}" stroke-width="10"/>
    <rect x="418" y="508" width="208" height="104" rx="18" fill="${accent}" opacity="0.16" stroke="${accent}" stroke-width="8" stroke-dasharray="18 12"/>
  `;
  icons.lunchbag = `
    <path d="M402 414h240l28 274H374z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M454 414v-46c0-30 26-56 68-56s68 26 68 56v46" fill="none" stroke="${line}" stroke-width="10"/>
    <rect x="430" y="496" width="184" height="118" rx="16" fill="${accent}" opacity="0.18"/>
  `;
  icons.veggiebag = `
    <path d="M394 372h256l-26 316H420z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M452 372c6 22 24 36 70 36s64-14 70-36" fill="none" stroke="${line}" stroke-width="10"/>
    <path d="M452 486c40 18 84 18 140 0" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
  `;
  icons.cup = `
    <path d="M396 344h252l-30 324H426z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M648 394c42 0 74 26 74 72s-32 72-74 72" fill="none" stroke="${line}" stroke-width="10"/>
    <path d="M444 420h156m-148 78h140" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.toothbrush = `
    <rect x="496" y="274" width="52" height="368" rx="22" fill="${light}" stroke="${line}" stroke-width="10"/>
    <rect x="478" y="224" width="88" height="70" rx="18" fill="#ffffff" stroke="${line}" stroke-width="10"/>
    <path d="M486 238v42M500 238v42M514 238v42M528 238v42M542 238v42M556 238v42" stroke="${accent}" stroke-width="6"/>
  `;
  icons.comb = `
    <path d="M354 420h336c34 0 58 24 58 54s-24 54-58 54H354z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M386 528v88M410 528v88M434 528v88M458 528v88M482 528v88M506 528v88M530 528v88M554 528v88M578 528v88M602 528v88M626 528v88" stroke="${line}" stroke-width="8"/>
    <circle cx="662" cy="474" r="18" fill="${accent}" opacity="0.22"/>
  `;
  icons.tongue = `
    <path d="M430 338c-16 0-30 14-30 30v246c0 16 14 30 30 30h184c16 0 30-14 30-30V368c0-16-14-30-30-30h-184z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M522 412c-34 0-62 22-62 50s28 50 62 50 62-22 62-50-28-50-62-50zm0 32c14 0 24 8 24 18s-10 18-24 18-24-8-24-18 10-18 24-18z" fill="none" stroke="${accent}" stroke-width="10"/>
  `;
  icons.razor = `
    <rect x="450" y="244" width="144" height="88" rx="20" fill="#ffffff" stroke="${line}" stroke-width="10"/>
    <path d="M522 332v322" stroke="${line}" stroke-width="18" stroke-linecap="round"/>
    <path d="M474 272h96" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.soapstand = `
    <rect x="366" y="520" width="312" height="98" rx="26" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M418 550h208M418 584h208" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    <path d="M426 474c20-26 48-40 96-40s76 14 96 40" fill="none" stroke="${line}" stroke-width="10"/>
  `;
  icons.loofah = `
    <circle cx="522" cy="500" r="138" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M430 500c56-66 114-66 184 0-70 66-128 66-184 0zm22-48c68 18 114 62 140 128" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.book = `
    <path d="M364 292h304c26 0 46 20 46 46v356c-30-22-68-34-110-34H364z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M364 292v368c42 0 80 12 110 34V326c0-18-14-34-34-34z" fill="#ffffff" opacity="0.7" stroke="${line}" stroke-width="10"/>
    <path d="M430 396h202m-202 68h202m-202 68h146" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.pen = `
    <path d="M494 254h56v330h-56z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M494 584h56l-28 112z" fill="${accent}" opacity="0.35" stroke="${line}" stroke-width="10"/>
    <path d="M494 300h56" stroke="${accent}" stroke-width="10"/>
  `;
  icons.pencilbox = `
    <rect x="330" y="470" width="384" height="176" rx="24" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M330 528h384" stroke="${accent}" stroke-width="12"/>
    <circle cx="666" cy="560" r="12" fill="${accent}" opacity="0.35"/>
  `;
  icons.stand = `
    <path d="M430 618h184l-92-208z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <rect x="430" y="618" width="184" height="42" rx="14" fill="${accent}" opacity="0.24" stroke="${line}" stroke-width="10"/>
    <path d="M470 562h104" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.holder = `
    <rect x="414" y="412" width="216" height="236" rx="28" fill="${light}" stroke="${line}" stroke-width="10"/>
    <rect x="454" y="296" width="28" height="134" rx="12" fill="#ffffff" stroke="${line}" stroke-width="8"/>
    <rect x="510" y="266" width="28" height="164" rx="12" fill="#ffffff" stroke="${line}" stroke-width="8"/>
    <rect x="566" y="320" width="28" height="110" rx="12" fill="#ffffff" stroke="${line}" stroke-width="8"/>
  `;
  icons.keychain = `
    <circle cx="462" cy="454" r="84" fill="none" stroke="${line}" stroke-width="12"/>
    <path d="M520 454h118" stroke="${line}" stroke-width="12" stroke-linecap="round"/>
    <rect x="638" y="430" width="74" height="48" rx="12" fill="${light}" stroke="${line}" stroke-width="10"/>
    <circle cx="462" cy="454" r="18" fill="${accent}" opacity="0.24"/>
  `;
  icons.stapler = `
    <path d="M376 536c0-74 58-136 132-136h158c42 0 74 32 74 74v28H376z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <rect x="376" y="536" width="364" height="88" rx="18" fill="#ffffff" stroke="${line}" stroke-width="10"/>
    <path d="M430 478h238" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.blanket = `
    <rect x="320" y="338" width="404" height="324" rx="28" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M364 662v72M412 662v72M460 662v72M508 662v72M556 662v72M604 662v72M652 662v72" stroke="${accent}" stroke-width="8"/>
  `;
  icons.shawl = `
    <path d="M312 412h420l-54 214H366z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M350 626v72M394 626v72M438 626v72M482 626v72M526 626v72M570 626v72M614 626v72M658 626v72" stroke="${accent}" stroke-width="8"/>
  `;
  icons.dungaree = `
    <path d="M430 342h184v104l74 42-40 68-58-30v166H454V526l-58 30-40-68 74-42z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M470 342v-50h26v50m78-50v50h-26" stroke="${line}" stroke-width="10"/>
  `;
  icons.sleepset = `
    <path d="M340 420h226v236H340z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M610 420h96l-18 236H592z" fill="#ffffff" opacity="0.8" stroke="${line}" stroke-width="10"/>
    <path d="M382 472h142M622 470h54" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.feetbottom = `
    <path d="M372 320h300l-24 324H558l-26-110-26 110H396z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M406 644c18 24 44 36 72 36s54-12 72-36M566 644c18 24 44 36 72 36" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.tee = `
    <path d="M394 358l94-52h68l94 52 76 42-38 68-68-34v262H424V434l-68 34-38-68z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M474 306c10 28 32 46 64 46s54-18 64-46" fill="none" stroke="${line}" stroke-width="10"/>
    <path d="M452 520c44-18 88-18 132 0" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.longtee = `
    <path d="M384 352l102-56h72l102 56 90 58-46 72-74-42v262H414V440l-74 42-46-72z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M474 296c10 30 34 48 68 48s58-18 68-48" fill="none" stroke="${line}" stroke-width="10"/>
    <path d="M450 524c48-20 96-20 144 0" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.bodysuithanger = `
    <path d="M420 314h180l66 52-34 54-52-28v120l88 162-94 42-68-124h-12l-68 124-94-42 88-162V392l-52 28-34-54 66-52z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M522 254c0-24 18-44 44-44s44 20 44 44" fill="none" stroke="${line}" stroke-width="10"/>
    <path d="M522 254h124" stroke="${line}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.bodysuitss = `
    <path d="M416 346h188l64 42-30 50-54-24v114l92 162-94 42-70-126h-12l-70 126-94-42 92-162V414l-54 24-30-50 64-42z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M470 346c8 22 28 34 50 34s42-12 50-34" fill="none" stroke="${line}" stroke-width="10"/>
  `;
  icons.brushholder = `
    <ellipse cx="522" cy="622" rx="120" ry="26" fill="${accent}" opacity="0.14"/>
    <rect x="432" y="372" width="180" height="250" rx="34" fill="${light}" stroke="${line}" stroke-width="10"/>
    <rect x="476" y="262" width="20" height="130" rx="10" fill="#ffffff" stroke="${line}" stroke-width="8"/>
    <rect x="512" y="230" width="20" height="162" rx="10" fill="#ffffff" stroke="${line}" stroke-width="8"/>
    <rect x="548" y="278" width="20" height="114" rx="10" fill="#ffffff" stroke="${line}" stroke-width="8"/>
  `;
  icons.penstand = `
    <rect x="402" y="402" width="240" height="246" rx="26" fill="${light}" stroke="${line}" stroke-width="10"/>
    <rect x="452" y="250" width="24" height="170" rx="12" fill="#ffffff" stroke="${line}" stroke-width="8"/>
    <rect x="500" y="228" width="24" height="192" rx="12" fill="#ffffff" stroke="${line}" stroke-width="8"/>
    <rect x="548" y="278" width="24" height="142" rx="12" fill="#ffffff" stroke="${line}" stroke-width="8"/>
    <path d="M430 514h184" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.diary = `
    <rect x="350" y="254" width="340" height="456" rx="18" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M422 254v456" stroke="${line}" stroke-width="8"/>
    <rect x="468" y="430" width="118" height="118" rx="14" fill="${accent}" opacity="0.14"/>
    <path d="M486 488h82" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  `;
  icons.calendar = `
    <rect x="370" y="356" width="304" height="214" rx="20" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M422 356v-52M622 356v-52" stroke="${line}" stroke-width="12" stroke-linecap="round"/>
    <path d="M370 428h304" stroke="${accent}" stroke-width="10"/>
    <path d="M430 474h58M514 474h58M430 520h58M514 520h58" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  `;
  icons.pjset = `
    <path d="M344 410h208v230H344z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M598 410h108l-20 230H578z" fill="#ffffff" opacity="0.85" stroke="${line}" stroke-width="10"/>
    <path d="M384 468h122M614 468h52" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  `;
  icons.wovenpj = `
    <path d="M336 398h226v202H336z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M612 430h100l-16 170H596z" fill="#ffffff" opacity="0.85" stroke="${line}" stroke-width="10"/>
    <path d="M378 448h142M378 492h142M626 470h58" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  `;
  icons.teeset = `
    <path d="M356 366l84-46h64l84 46 54 34-30 52-48-24v170H382V428l-48 24-30-52z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M610 438h88l-16 170H594z" fill="#ffffff" opacity="0.85" stroke="${line}" stroke-width="10"/>
    <path d="M416 488c32-12 64-12 96 0" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  `;
  icons.sleevelessset = `
    <path d="M372 334h160l36 62v186H336V396z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M596 430h106l-18 152H578z" fill="#ffffff" opacity="0.85" stroke="${line}" stroke-width="10"/>
    <path d="M398 486h110" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  `;
  icons.cardiganset = `
    <path d="M330 382h198v198H330z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M584 414h116l-20 168H564z" fill="#ffffff" opacity="0.85" stroke="${line}" stroke-width="10"/>
    <path d="M466 382v198" stroke="${accent}" stroke-width="8"/>
    <path d="M614 348c48 0 92 38 108 86" fill="none" stroke="${line}" stroke-width="10"/>
  `;
  icons.layeredset = `
    <path d="M324 392h184v182H324z" fill="${light}" stroke="${line}" stroke-width="10"/>
    <path d="M520 360h182v214H520z" fill="#ffffff" opacity="0.85" stroke="${line}" stroke-width="10"/>
    <path d="M392 430h48M392 470h48M566 444h90" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  `;

  return icons[type] || icons.generic;
}

function lines(text, size) {
  const words = text.split(/\s+/);
  const rows = [];
  let current = '';
  const limit = size > 40 ? 18 : 24;

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > limit) {
      if (current) rows.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) rows.push(current);
  return rows.slice(0, 3);
}

function packCount(row) {
  const match = row.title.match(/(\d+)\s*(pk|pc)/i);
  if (match) return Number(match[1]);
  if (/two-piece|2-piece/i.test(row.title)) return 2;
  return 1;
}

function objectScale(row, count) {
  if (row.category === 'apparel') {
    if (count >= 6) return 0.46;
    if (count >= 3) return 0.58;
    if (count === 2) return 0.72;
    return 0.86;
  }
  if (count >= 3) return 0.58;
  if (count === 2) return 0.72;
  return 0.82;
}

function offsets(count) {
  if (count >= 6) return [-170, -90, -10, 70, 150, 230].map((x, i) => [x, i % 2 ? 30 : -20]);
  if (count === 4) return [
    [-135, -20],
    [-45, 26],
    [45, -20],
    [135, 26],
  ];
  if (count === 3) return [
    [-120, 20],
    [0, -28],
    [120, 20],
  ];
  if (count === 2) return [
    [-70, 18],
    [70, -18],
  ];
  return [[0, 0]];
}

function shortLabel(row) {
  return String(row.title || '')
    .split('—')[0]
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 42);
}

function collectionLabel(row) {
  const family = String(row.productFamily || '').trim();
  if (!family) return String(row.category || '').toUpperCase();
  return family.replace(/^SS\d+\s+/i, '').slice(0, 36);
}

function packBadge(count) {
  if (count <= 1) return '';
  return `${count}pk`;
}

function motifFromRow(row) {
  const text = `${row.title} ${row.shortDescription} ${row.bulletPoints}`.toLowerCase();
  if (text.includes('cherry')) return 'cherry';
  if (text.includes('floral') || text.includes('flower') || text.includes('orchard') || text.includes('peach')) return 'floral';
  if (text.includes('sunflower')) return 'sunflower';
  if (text.includes('rangoli') || text.includes('tribal')) return 'geometric';
  if (text.includes('animal') || text.includes('bear') || text.includes('horse')) return 'animal';
  if (text.includes('stripe') || text.includes('rib')) return 'stripe';
  if (text.includes('dot') || text.includes('star')) return 'dot';
  if (text.includes('graphic')) return 'graphic';
  if (text.includes('ruffle')) return 'ruffle';
  return 'plain';
}

function overlayDetail(type, row, colors, index) {
  const accent = colors[2];
  const ink = colors[3];
  const motif = motifFromRow(row);
  const text = `${row.title} ${row.shortDescription}`.toLowerCase();

  if (type === 'bag') {
    if (motif === 'sunflower' || text.includes('sunflower')) {
      return `<circle cx="522" cy="506" r="54" fill="none" stroke="${accent}" stroke-width="12"/><circle cx="522" cy="506" r="16" fill="${accent}"/>`;
    }
    if (motif === 'geometric' || text.includes('rangoli') || text.includes('tribal')) {
      return `<path d="M462 504h120M522 444v120M476 458l92 92M568 458l-92 92" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`;
    }
    if (motif === 'floral' || text.includes('flower') || text.includes('peach')) {
      return `<path d="M522 458c18 26 18 64 0 90-18-26-18-64 0-90zm-38 44c30-8 60 2 76 28-30 8-60-2-76-28zm76 0c-16 26-46 36-76 28 16-26 46-36 76-28z" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`;
    }
    if (text.includes('black') || text.includes('gold') || text.includes('grey') || text.includes('gray')) {
      return `<rect x="448" y="468" width="148" height="90" rx="14" fill="none" stroke="${accent}" stroke-width="10"/>`;
    }
  }

  if (type === 'bottle') {
    return `<path d="M452 454h140m-140 84h140" stroke="${accent}" stroke-width="10" stroke-linecap="round"/><text x="522" y="610" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="${ink}" opacity="0.55">500ml</text>`;
  }

  if (type === 'cup') {
    return `<text x="522" y="560" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="${ink}" opacity="0.5">350ml</text>`;
  }

  if (type === 'notebook' || type === 'desk' || type === 'diary') {
    return `<path d="M450 414h146m-146 62h146m-146 62h110" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`;
  }

  if (type === 'toothbrush' && text.includes('kids')) {
    return `<circle cx="522" cy="560" r="18" fill="${accent}" opacity="0.35"/>`;
  }

  if (type === 'comb') {
    if (text.includes('pintail')) return `<path d="M690 474h70" stroke="${ink}" stroke-width="10" stroke-linecap="round"/>`;
    if (text.includes('pocket')) return `<rect x="360" y="430" width="48" height="88" rx="10" fill="${accent}" opacity="0.2"/>`;
  }

  if (type === 'hotel') {
    const kits = text.includes('luxury') ? 5 : text.includes('premium') ? 4 : 3;
    return Array.from({ length: kits }, (_, i) => {
      const x = 360 + i * 70;
      return `<rect x="${x}" y="430" width="52" height="70" rx="10" fill="#ffffff" stroke="${lineStroke(ink)}" stroke-width="8"/>`;
    }).join('');
  }

  if (row.category === 'apparel' || type === 'dress' || type === 'tee' || type === 'bodysuit' || type === 'bodysuitss' || type === 'bodysuithanger' || type === 'bottom' || type === 'shorts' || type === 'tank') {
    if (motif === 'cherry') {
      return `
        <circle cx="494" cy="502" r="14" fill="${accent}"/>
        <circle cx="526" cy="494" r="14" fill="${accent}"/>
        <path d="M510 484c6-16 20-28 40-36M510 484c-4-16-14-28-28-38" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>
      `;
    }
    if (motif === 'floral') {
      return `
        <circle cx="522" cy="496" r="10" fill="${accent}"/>
        <circle cx="522" cy="468" r="14" fill="none" stroke="${accent}" stroke-width="8"/>
        <circle cx="548" cy="486" r="14" fill="none" stroke="${accent}" stroke-width="8"/>
        <circle cx="538" cy="516" r="14" fill="none" stroke="${accent}" stroke-width="8"/>
        <circle cx="506" cy="516" r="14" fill="none" stroke="${accent}" stroke-width="8"/>
        <circle cx="496" cy="486" r="14" fill="none" stroke="${accent}" stroke-width="8"/>
      `;
    }
    if (motif === 'stripe') {
      return `<path d="M466 438v130M494 438v130M522 438v130M550 438v130M578 438v130" stroke="${accent}" stroke-width="6" opacity="0.55"/>`;
    }
    if (motif === 'animal') {
      return `<path d="M470 516c16-34 44-54 84-54 38 0 64 16 80 48-18 16-38 24-60 24l-18 26h-26l8-26c-20-2-40-8-68-18z" fill="none" stroke="${accent}" stroke-width="8" stroke-linejoin="round"/>`;
    }
    if (motif === 'dot') {
      const dots = [
        [472, 452],
        [536, 438],
        [590, 470],
        [486, 530],
        [556, 520],
      ];
      return dots
        .map(([x, y], i2) => `<circle cx="${x}" cy="${y}" r="${6 + ((i2 + index) % 3)}" fill="${accent}" opacity="0.45"/>`)
        .join('');
    }
    if (motif === 'graphic') {
      return `<circle cx="522" cy="500" r="42" fill="none" stroke="${accent}" stroke-width="10"/><path d="M500 500h44M522 478v44" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`;
    }
    if (motif === 'ruffle') {
      return `<path d="M430 620c28 24 64 36 92 36s64-12 92-36" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`;
    }
  }

  return '';
}

function lineStroke(ink) {
  return ink;
}

function cardSvg(row) {
  const colors = palette(row);
  const [bgSoft, panel, accent, ink] = colors;
  const type = iconType(row);
  const count = Math.min(packCount(row), 6);
  const scale = objectScale(row, count);
  const copies = offsets(count);
  const seed = hashValue(row.id);
  const label = shortLabel(row);
  const collection = collectionLabel(row);
  const badge = packBadge(count);
  const sku = String(row.sku || '').slice(0, 18);
  const motif = motifFromRow(row);
  const shadeOptions = [panel, '#ffffff', bgSoft, accent];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="${escXml(row.title)}">
  <defs>
    <linearGradient id="stage" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bgSoft}"/>
      <stop offset="55%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f3f1ec"/>
    </linearGradient>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${panel}"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="180%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.16"/>
    </filter>
  </defs>

  <rect width="1200" height="1200" fill="url(#stage)"/>
  <rect x="48" y="48" width="1104" height="1104" rx="36" fill="#ffffff" opacity="0.55"/>
  <rect x="48" y="48" width="1104" height="86" rx="36" fill="url(#band)" opacity="0.92"/>
  <rect x="48" y="98" width="1104" height="36" fill="#ffffff"/>

  <text x="88" y="104" font-family="Georgia, 'Times New Roman', serif" font-size="28" fill="${ink}" opacity="0.9">${escXml(collection)}</text>
  ${badge ? `<rect x="980" y="66" width="120" height="48" rx="24" fill="#ffffff"/><text x="1040" y="98" text-anchor="middle" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="${ink}">${badge}</text>` : ''}

  <ellipse cx="600" cy="880" rx="${220 + count * 28}" ry="42" fill="#000000" opacity="0.07"/>

  ${copies
    .map(([dx, dy], index) => {
      const shade = shadeOptions[(seed + index) % shadeOptions.length];
      const opacity = Math.max(0.78, 1 - index * 0.07);
      const rotation = ((seed + index * 19) % 11) - 5;
      const shiftY = dy + ((seed + index * 13) % 18) - 9;
      const transform = `translate(${dx} ${shiftY - 40}) rotate(${rotation} 522 522) scale(${scale})`;
      return `
  <g transform="${transform}" filter="url(#shadow)" opacity="${opacity}">
    ${iconSvg(type, [bgSoft, shade, accent, ink])}
    ${index === 0 ? overlayDetail(type, row, colors, index) : ''}
  </g>`;
    })
    .join('\n')}

  <rect x="120" y="980" width="960" height="120" rx="28" fill="#ffffff" stroke="${panel}" stroke-width="4"/>
  <text x="600" y="1034" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="42" fill="${ink}">${escXml(label)}</text>
  <text x="600" y="1078" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" fill="${ink}" opacity="0.65">${escXml(sku)}${motif !== 'plain' ? ` · ${motif}` : ''}</text>
</svg>`;
}

const raw = readFileSync(catalogPath, 'utf8').replace(/^\uFEFF/, '');
const parsed = parseCsv(raw);
const headers = parsed[0];
const rows = parsed.slice(1).map((cells) => Object.fromEntries(headers.map((header, i) => [header, cells[i] ?? ''])));

const deduped = [];
const seen = new Set();
let removed = 0;

for (const row of rows) {
  const key = `${row.id}::${row.sku}::${row.title}`;
  if (seen.has(key)) {
    removed++;
    continue;
  }
  seen.add(key);
  deduped.push(row);
}

let generated = 0;
for (const row of deduped) {
  if (!/^(gg-|bh-)/.test(row.id)) continue;
  const webPath = slugImagePath(row);
  const diskPath = path.join(root, 'public', stripQuery(webPath).replace(/^\//, ''));
  mkdirSync(path.dirname(diskPath), { recursive: true });

  // AI packshots are authored via GenerateImage and stored as PNG.
  // Do not overwrite existing PNG packshots with SVG wireframes.
  if (existsSync(diskPath) && diskPath.endsWith('.png')) {
    generated++;
  } else {
    const svgPath = diskPath.replace(/\.png$/, '.svg');
    writeFileSync(svgPath, cardSvg(row), 'utf8');
    generated++;
  }

  row.image = versionedPath(webPath);
  row.imageGallery = row.image;

  if (row.description) {
    row.description = row.description
      .replace(
        'Product artwork cropped from supplier range sheet until dedicated packshots are available.',
        'Illustrative AI-generated packshot until supplier photography is available.',
      )
      .replace(
        /Illustrative AI-generated packshot until supplier photography is available\./g,
        'Illustrative AI-generated packshot until supplier photography is available.',
      );
  }
}

const out = [headers.join(',')];
for (const row of deduped) {
  out.push(headers.map((header) => escCsv(row[header] ?? '')).join(','));
}
writeFileSync(catalogPath, `${out.join('\n')}\n`, 'utf8');

console.log(`Preserved/noted ${generated} lineup image slots (AI PNGs preferred).`);
console.log(`Removed ${removed} duplicate rows.`);
