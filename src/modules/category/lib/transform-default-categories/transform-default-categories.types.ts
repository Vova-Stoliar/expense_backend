import type { Category } from '~/shared/types';

export interface TransformDefaultCategories {
    categories: Pick<Category, 'name' | 'amount' | 'notes'>[];
}
