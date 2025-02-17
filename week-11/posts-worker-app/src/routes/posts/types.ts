import { z } from 'zod';
import { postSchema, createPostSchema, updatePostSchema } from './schema';

export type Post = z.infer<typeof postSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
