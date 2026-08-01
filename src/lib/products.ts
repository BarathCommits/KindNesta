export function formatPrice(price: number, currency = 'EUR'): string {
  const fractionDigits = price < 10 ? 3 : 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(price);
}

export function priceLabel(priceBasis?: string): string {
  if (priceBasis === 'suggested-retail') return 'Sugg. retail';
  return 'Ex-works';
}

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
  };
  return labels[category] ?? category;
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
