import { getTransformedCategory } from '~/modules/category/lib';
import type { AddCategoryParams } from '~/modules/category/types';

export function addCategory(params: AddCategoryParams) {
    const { categoryToAdd, categories } = params;

    const dateTime = new Date().toISOString();

    return [...categories, getTransformedCategory({ category: categoryToAdd, dateTime })];
}
