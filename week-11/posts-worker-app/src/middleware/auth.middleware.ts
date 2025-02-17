import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verifyToken } from '../utils/jwt.util';

export const auth = async (c: Context, next: Next) => {
	const authHeader = c.req.header('Authorization');

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new HTTPException(401, { message: 'Unauthorized' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = await verifyToken(token, c.env);
		c.set('user', payload);
		await next();
	} catch (error) {
		throw new HTTPException(401, { message: 'Invalid token' });
	}
};
