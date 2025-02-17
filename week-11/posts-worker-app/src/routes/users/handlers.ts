import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { getPrisma } from '../../utils/prisma.util';
import { hashPassword, verifyPassword } from '../../utils/password.util';
import { generateToken } from '../../utils/jwt.util';
import type { Env } from '../../types/env';
import { Variables } from '../../types/hono';
import { CreateUserInput, LoginUserInput } from './types';

type HonoContext = Context<{ Bindings: Env; Variables: Variables }>;

export const signupHandler = async (c: HonoContext) => {
	const data = c.get('validated') as CreateUserInput;

	try {
		const hashedPassword = await hashPassword(data.password);
		const prisma = getPrisma(c.env.DATABASE_URL);
		const user = await prisma.user.create({
			data: {
				...data,
				password: hashedPassword,
			},
			select: {
				id: true,
				username: true,
				email: true,
				createdAt: true,
			},
		});

		return c.json({ user }, 201);
	} catch (error) {
		console.error(error);
		throw new HTTPException(400, { message: 'Username or email already exists' });
	}
};

export const signinHandler = async (c: HonoContext) => {
	const { email, password } = c.get('validated') as LoginUserInput;
	const prisma = getPrisma(c.env.DATABASE_URL);

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		throw new HTTPException(401, { message: 'Invalid credentials' });
	}

	const isValid = await verifyPassword(password, user.password);
	if (!isValid) {
		throw new HTTPException(401, { message: 'Invalid credentials' });
	}

	const token = await generateToken({ userId: user.id }, c.env);
	return c.json({ token });
};
