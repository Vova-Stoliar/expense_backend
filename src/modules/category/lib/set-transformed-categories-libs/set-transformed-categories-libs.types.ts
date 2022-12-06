import type { Category } from '~/shared/types';

export interface SetTransformedCategories<T> {
    transformedCategories: T;
    category: Category;
}
