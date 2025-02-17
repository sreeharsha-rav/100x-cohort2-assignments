import { z } from 'zod';

export const postSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1).max(255),
	body: z.string().min(1),
	authorId: z.string().uuid(),
	published: z.boolean(),
	tags: z.array(z.number()).optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createPostSchema = z.object({
	title: z.string().min(1).max(255),
	body: z.string().min(1),
	published: z.boolean().optional(),
	tags: z.array(z.number()).optional(),
});

export const updatePostSchema = createPostSchema.partial();
