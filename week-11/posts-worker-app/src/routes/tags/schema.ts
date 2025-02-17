import { z } from 'zod';

export const tagSchema = z.object({
	id: z.number().int(),
	tag: z.string().min(1).max(255),
});

export const createTagSchema = z.object({
	tag: z.string().min(1).max(255),
});

export const updateTagSchema = createTagSchema.partial();
