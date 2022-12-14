import type { User } from '@prisma/client';
import type { Category } from '~/shared/types';

export interface SaveCategoriesParams {
    categories: Category[];
    userId: User['id'];
}

export interface DeleteCategoryTransaction {
    deletedCategoryId: Category['id'];
    otherCategoryId: Category['id'];
    userId: User['id'];
    categories: Category[];
}
