import type { TransformedCategories } from '~/modules/category/types';
import type { Category } from '~/shared/types';

interface OtherCategory {
    otherCategory: Category;
}

export interface UpdateOtherCategory extends OtherCategory {
    categoryToDelete: Category;
}

export interface DeleteCategory {
    categories: Category[];
    categoryToDelete: Category;
}

export interface HandleOtherCategoryParams extends OtherCategory {
    transformedCategories: TransformedCategories;
}
