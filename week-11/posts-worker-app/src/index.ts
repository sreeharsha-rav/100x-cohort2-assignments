import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { userRouter } from './routes/users';
import { postRouter } from './routes/posts';
import { tagRouter } from './routes/tags';
import type { Env } from './types/env';
import type { Variables } from './types/hono';

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Middleware
app.use('*', cors());
app.use('*', logger());
app.use('*', prettyJSON());

// Error handling
app.onError((err, c) => {
	console.error(`${err}`);
	const message = err.message || 'Internal Server Error';
	const status = 500;
	return c.json({ message }, status);
});

// Routes
app.route('/users', userRouter);
app.route('/posts', postRouter);
app.route('/tags', tagRouter);

// health check
app.get('/health', (c) => {
	return c.json({ message: 'OK' });
});

export default app;
