export function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    hangtags: 'Hangtags',
    hangers: 'Hangers',
    packaging: 'Packaging',
    bags: 'Shopping bags',
    polybags: 'Polybags',
    stationery: 'Stationery',
    labels: 'Labels',
    trims: 'Trims & tapes',
    apparel: 'Apparel',
    home: 'Home & hospitality',
    'personal-care': 'Personal care',
  };
  return labels[category] ?? category;
}

/** Product brand labels are hidden site-wide. */
export function displayBrand(_brand?: string | null): string | null {
  return null;
}

const PRICE_COPY = /\b(moq|ex-works|pricing|price list|unit price|trade price)\b/i;

/** Drop bullets that mention price, MOQ, or ex-works terms. */
export function publicBullets(bullets: string[] = []): string[] {
  return bullets.filter((b) => b.trim() && !PRICE_COPY.test(b));
}

/** Remove sentences that mention price, MOQ, or ex-works terms. */
export function publicCopy(text = ''): string {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim() && !PRICE_COPY.test(s))
    .join(' ')
    .trim();
}

export function ecoTagLabel(tag: string): string {
  return tag
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export type KindnessBand = 'high' | 'mid' | 'low';

export function kindnessBand(score: number): KindnessBand {
  if (score >= 80) return 'high';
  if (score >= 50) return 'mid';
  return 'low';
}

export function kindnessBandLabel(score: number): string {
  const band = kindnessBand(score);
  if (band === 'high') return 'Strong';
  if (band === 'mid') return 'Good';
  return 'Fair';
}
