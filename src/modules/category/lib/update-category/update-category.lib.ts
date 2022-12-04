import type { UpdateCategoryParams } from './update-category.types';

export function updateCategory(params: UpdateCategoryParams) {
    const { fieldsToUpdateById, categories, categoryToUpdateId } = params;

    return categories.map((category) => {
        if (category.id === categoryToUpdateId) {
            return {
                ...category,
                ...fieldsToUpdateById,
                updatedAt: new Date().toISOString(),
            };
        }

        return category;
    });
}
