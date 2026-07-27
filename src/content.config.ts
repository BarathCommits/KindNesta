import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    sku: z.string(),
    price: z.number().positive(),
    currency: z.string().default('USD'),
    packSize: z.string().default('1 unit'),
    moq: z.number().int().positive().default(1),
    category: z.enum(['home', 'personal-care', 'kitchen', 'garden', 'dress']),
    image: z.string(),
    shortDescription: z.string(),
    kindnessScore: z.number().int().min(0).max(100),
    kindnessScoreNotes: z.string().optional(),
    ecoTags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    inStock: z.boolean().default(true),
  }),
});

export const collections = { products };
