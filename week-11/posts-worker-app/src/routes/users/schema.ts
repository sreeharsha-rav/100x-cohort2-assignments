import { z } from 'zod';

export const userSchema = z.object({
	id: z.string().uuid(),
	username: z.string().min(3).max(50),
	email: z.string().email(),
	password: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createUserSchema = z.object({
	username: z.string().min(3).max(50),
	email: z.string().email(),
	password: z.string().min(6),
});

export const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});
