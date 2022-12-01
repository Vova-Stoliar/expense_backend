import { v4 as uuid } from 'uuid';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import type { Category } from '~/shared/types';

export function getDefaultCategories() {
    const date = new Date().toISOString();

    const categories: Category[] = Object.values(DEFAULT_CATEGORIES).map((category) => {
        return {
            name: category,
            id: uuid(),
            notes: '',
            amount: 0,
            updatedAt: date,
            createdAt: date,
        };
    });

    return categories;
}
