import { Hono } from 'hono';
import { auth } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createTagSchema, updateTagSchema } from './schema';
import { getAllTagsHandler, createTagHandler, updateTagHandler } from './handlers';
import type { Env } from '../../types/env';

const router = new Hono<{ Bindings: Env }>();

router
	.get('/', getAllTagsHandler)
	.post('/', auth, validate(createTagSchema), createTagHandler)
	.put('/:id', auth, validate(updateTagSchema), updateTagHandler);

export default router;
