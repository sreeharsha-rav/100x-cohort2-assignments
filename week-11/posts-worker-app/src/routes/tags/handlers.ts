import { Context } from 'hono';
import { getPrisma } from '../../utils/prisma.util';
import type { Env } from '../../types/env';
import { Variables } from '../../types/hono';
import { CreateTagInput, UpdateTagInput } from './types';

type HonoContext = Context<{ Bindings: Env; Variables: Variables }>;

export const getAllTagsHandler = async (c: HonoContext) => {
	const prisma = getPrisma(c.env.DATABASE_URL);

	const tags = await prisma.tag.findMany();

	return c.json({ tags });
};

export const createTagHandler = async (c: HonoContext) => {
	const data = c.get('validated') as CreateTagInput;
	const prisma = getPrisma(c.env.DATABASE_URL);

	const tag = await prisma.tag.create({
		data,
	});

	return c.json({ tag }, 201);
};

export const updateTagHandler = async (c: HonoContext) => {
	const id = c.req.param('id');
	const data = c.get('validated') as UpdateTagInput;
	const prisma = getPrisma(c.env.DATABASE_URL);

	const tag = await prisma.tag.update({
		where: { id },
		data: {
			...data,
		},
	});

	return c.json({ tag });
};
