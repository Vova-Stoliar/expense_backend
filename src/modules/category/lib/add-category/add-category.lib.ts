import { transformCategory } from '~/modules/category/lib';
import type { AddCategoryParams } from './add-category.types';

export function addCategory(params: AddCategoryParams) {
    const { categoryToAdd, categories } = params;

    const dateTime = new Date().toISOString();

    const transformedCategory = transformCategory({ category: categoryToAdd, dateTime });

    return {
        categories: [...categories, transformedCategory],
        category: transformedCategory,
    };
}
