import type { TransformCategories } from './transform-categories.types';

export function transformCategories(params: TransformCategories) {
    const { categories, categoryId, transactionAmount } = params;

    return categories.map((category) => {
        if (category.id === categoryId) {
            return {
                ...category,
                amount: category.amount + transactionAmount,
                updatedAt: new Date().toISOString(),
            };
        }

        return category;
    });
}
