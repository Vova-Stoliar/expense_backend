import type { UpdateCategoryDto } from '~/modules/category/dto';
import type { Category } from '~/shared/types';

export interface UpdateCategoryParams {
    categories: Category[];
    fieldsToUpdateById: UpdateCategoryDto;
    categoryToUpdateId: Category['id'];
}

export interface TransformedCategories {
    categories: Category[];
    category: Category;
}
