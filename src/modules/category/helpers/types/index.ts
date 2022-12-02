import type { User } from '@prisma/client';
import type { Category } from '~/shared/types';

export interface SaveCategoriesParams {
    categories: Category[];
    userId: User['id'];
}
