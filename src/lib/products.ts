export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    home: 'Home',
    'personal-care': 'Personal care',
    kitchen: 'Kitchen',
    garden: 'Garden',
    dress: 'Dress',
  };
  return labels[category] ?? category;
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
