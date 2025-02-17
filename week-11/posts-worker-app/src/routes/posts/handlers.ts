import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { getPrisma } from '../../utils/prisma.util';
import type { Env } from '../../types/env';
import { Variables } from '../../types/hono';
import { CreatePostInput, UpdatePostInput } from './types';

type HonoContext = Context<{ Bindings: Env; Variables: Variables }>;

export const getAllPostsHandler = async (c: HonoContext) => {
	const prisma = getPrisma(c.env.DATABASE_URL);

	const posts = await prisma.post.findMany({
		include: {
			author: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});
	return c.json({ posts });
};

export const createPostHandler = async (c: HonoContext) => {
	const data = c.get('validated') as CreatePostInput;
	const user = c.get('user');
	const prisma = getPrisma(c.env.DATABASE_URL);

	const post = await prisma.post.create({
		data: {
			...data,
			authorId: user.userId,
		},
		include: {
			author: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});

	return c.json({ post }, 201);
};

export const getPostHandler = async (c: HonoContext) => {
	const id = c.req.param('id');
	const prisma = getPrisma(c.env.DATABASE_URL);

	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});

	if (!post) {
		throw new HTTPException(404, { message: 'Post not found' });
	}

	return c.json({ post });
};

export const updatePostHandler = async (c: HonoContext) => {
	const id = c.req.param('id');
	const data = c.get('validated') as UpdatePostInput;
	const user = c.get('user');
	const prisma = getPrisma(c.env.DATABASE_URL);

	const existingPost = await prisma.post.findUnique({
		where: { id },
	});

	if (!existingPost) {
		throw new HTTPException(404, { message: 'Post not found' });
	}

	if (existingPost.authorId !== user.userId) {
		throw new HTTPException(403, { message: 'Forbidden' });
	}

	const post = await prisma.post.update({
		where: { id },
		data,
		include: {
			author: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});

	return c.json({ post });
};

export const deletePostHandler = async (c: HonoContext) => {
	const id = c.req.param('id');
	const user = c.get('user');
	const prisma = getPrisma(c.env.DATABASE_URL);

	const existingPost = await prisma.post.findUnique({
		where: { id },
	});

	if (!existingPost) {
		throw new HTTPException(404, { message: 'Post not found' });
	}

	if (existingPost.authorId !== user.userId) {
		throw new HTTPException(403, { message: 'Forbidden' });
	}

	await prisma.post.delete({
		where: { id },
	});

	return c.json({ message: 'Post deleted' }, 200);
};
