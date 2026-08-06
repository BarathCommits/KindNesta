import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { parseCatalogCsv } from '../scripts/parse-catalog-csv.mjs';

const productSchema = z.object({
  id: z.string(),
  parentId: z.string().optional(),
  sku: z.string(),
  title: z.string(),
  brand: z.string().default('KindNesta'),
  category: z.enum([
    'hangtags',
    'hangers',
    'packaging',
    'bags',
    'polybags',
    'stationery',
    'labels',
    'trims',
    'apparel',
    'home',
    'personal-care',
  ]),
  subcategory: z.string().optional(),
  shortDescription: z.string(),
  bulletPoints: z.array(z.string()).default([]),
  description: z.string().default(''),
  materials: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  image: z.string(),
  imageGallery: z.array(z.string()).default([]),
  variantType: z.string().optional(),
  variantValue: z.string().optional(),
  kindnessScore: z.number().int().min(0).max(100),
  kindnessScoreNotes: z.string().optional(),
  scoreVerified: z.boolean().default(false),
  ecoTags: z.array(z.string()).default([]),
  searchKeywords: z.array(z.string()).default([]),
  relatedIds: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  inStock: z.boolean().default(true),
  price: z.number().positive().optional(),
  currency: z.string().default('EUR'),
  priceBasis: z.enum(['ex-works', 'suggested-retail']).default('ex-works'),
  unit: z.enum(['piece', 'meter']).default('piece'),
  packSize: z.string().optional(),
  moq: z.number().int().positive().optional(),
  quality: z.string().optional(),
  productFamily: z.string().optional(),
});

const products = defineCollection({
  loader: file('data/psp-catalog.csv', {
    parser: (text) => parseCatalogCsv(text),
  }),
  schema: productSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    region: z.string(),
    regionCode: z.string(),
    tags: z.array(z.string()).default([]),
    stats: z.array(z.string()).default([]),
  }),
});

export const collections = { products, blog };
