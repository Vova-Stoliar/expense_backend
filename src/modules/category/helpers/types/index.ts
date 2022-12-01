import type { User } from '@prisma/client';
import type { Category, Replace } from '~/shared/types';

export type SaveCategoriesParams = Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;

export interface AddCategoryParams {
    currentCategories: Category[];
    category: Pick<Category, 'name' | 'amount' | 'notes'>;
}

export interface AddCategoryCategoryFieldsParams {
    category: Pick<Category, 'name' | 'amount' | 'notes'>;
    dateTime: Category['createdAt'];
}
