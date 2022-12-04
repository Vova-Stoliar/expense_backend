import type { Category } from '~/shared/types';

export interface TransformCategoryParams {
    category: Pick<Category, 'name' | 'amount' | 'notes'>;
    dateTime: Category['createdAt'];
}
