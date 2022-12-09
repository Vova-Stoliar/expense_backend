import type { UpdateCategoriesParams } from './update-category.types';

export function updateCategory(params: UpdateCategoriesParams) {
    const { categoryId, updatedCategoryFields } = params;

    const updatedAt = new Date().toISOString();

    const categories = params.categories.map((category) => {
        if (category.id === categoryId) {
            return {
                ...category,
                ...updatedCategoryFields,
                updatedAt: new Date().toISOString(),
            };
        }

        return category;
    });

    return {
        categories,
        updatedAt,
    };
}
