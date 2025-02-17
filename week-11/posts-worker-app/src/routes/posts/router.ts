import { Hono } from 'hono';
import { validate } from '../../middleware/validate.middleware';
import { auth } from '../../middleware/auth.middleware';
import { createPostSchema, updatePostSchema } from './schema';
import { getAllPostsHandler, createPostHandler, getPostHandler, updatePostHandler, deletePostHandler } from './handlers';
import type { Env } from '../../types/env';

const router = new Hono<{ Bindings: Env }>();

router
	.get('/', getAllPostsHandler)
	.post('/', auth, validate(createPostSchema), createPostHandler)
	.get('/:id', getPostHandler)
	.put('/:id', auth, validate(updatePostSchema), updatePostHandler)
	.delete('/:id', auth, deletePostHandler);

export default router;
