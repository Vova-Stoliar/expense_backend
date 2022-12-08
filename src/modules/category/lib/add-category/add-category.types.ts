import type { Category } from '~/shared/types';

export interface AddCategoryParams {
    categories: Category[];
    categoryToAdd: Pick<Category, 'name' | 'amount' | 'notes'>;
}
