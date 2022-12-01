import { v4 as uuid } from 'uuid';
import type { AddCategoryParams } from '~/modules/category/types';

export function addCategory(params: AddCategoryParams) {
    const { categoryToAdd, categories } = params;

    const dateTime = new Date().toISOString();

    return [...categories, { ...categoryToAdd, createdAt: dateTime, updatedAt: dateTime, id: uuid() }];
}
