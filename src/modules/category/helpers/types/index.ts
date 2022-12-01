import type { Category } from '~/shared/types';

export interface SaveCategoriesParams extends Pick<Category, 'id'> {
    categories: Category[];
}
