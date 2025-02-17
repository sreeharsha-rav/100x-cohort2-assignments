import { Context, Next } from 'hono';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import { Variables } from '../types/hono';

type HonoContext = Context<{ Bindings: Env; Variables: Variables }>;

export const validate = (schema: z.ZodSchema) => {
	return async (c: HonoContext, next: Next) => {
		try {
			const body = await c.req.json();
			const validated = await schema.parseAsync(body);
			c.set('validated', validated);
			await next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				throw new HTTPException(400, error);
			}
			throw error;
		}
	};
};
