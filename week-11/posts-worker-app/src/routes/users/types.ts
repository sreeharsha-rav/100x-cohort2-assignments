import { z } from 'zod';
import { userSchema, createUserSchema, loginUserSchema } from './schema';

export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
