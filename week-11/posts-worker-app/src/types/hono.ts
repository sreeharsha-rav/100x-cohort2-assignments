import type { User, CreateUserInput, LoginUserInput } from '../routes/users/types';
import type { Post, CreatePostInput, UpdatePostInput } from '../routes/posts/types';
import { CreateTagInput, UpdateTagInput } from '../routes/tags/types';

// Define what variables can be stored in the context
export interface Variables {
	user: { userId: string }; // for auth middleware
	validated: CreateUserInput | LoginUserInput | CreatePostInput | UpdatePostInput | CreateTagInput | UpdateTagInput; // union of all possible validation types
}
