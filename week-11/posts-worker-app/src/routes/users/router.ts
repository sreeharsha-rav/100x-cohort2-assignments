import { Hono } from 'hono';
import { validate } from '../../middleware/validate.middleware';
import { createUserSchema, loginUserSchema } from './schema';
import { signupHandler, signinHandler } from './handlers';
import type { Env } from '../../types/env';

const router = new Hono<{ Bindings: Env }>();

router.post('/signup', validate(createUserSchema), signupHandler).post('/signin', validate(loginUserSchema), signinHandler);

export default router;
