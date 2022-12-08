import type { UpdateCategory } from './update-category.types';

export function updateCategory(params: UpdateCategory) {
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
