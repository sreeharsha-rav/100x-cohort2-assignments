import { sign, verify } from 'hono/jwt';
import { Env } from '../types/env';
import { JWTPayload } from 'hono/utils/jwt/types';

export const generateToken = async (payload: JWTPayload, env: Env) => {
	return await sign(payload, env.JWT_SECRET);
};

export const verifyToken = async (token: string, env: Env) => {
	return await verify(token, env.JWT_SECRET);
};
