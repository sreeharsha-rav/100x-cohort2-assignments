import { z } from 'zod';
import { createTagSchema, tagSchema, updateTagSchema } from './schema';

export type Tag = z.infer<typeof tagSchema>;
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
