import { setTransformedCategoriesLibs } from '~/modules/category/lib';
import type { TransformedCategories, UpdateCategoryParams } from './update-category.types';

export function updateCategory(params: UpdateCategoryParams): TransformedCategories {
    const { fieldsToUpdateById, categories, categoryToUpdateId } = params;

    const { setCategories } = setTransformedCategoriesLibs();

    return categories.reduce((transformedCategories, category) => {
        if (category.id === categoryToUpdateId) {
            transformedCategories.category = {
                ...category,
                ...fieldsToUpdateById,
                updatedAt: new Date().toISOString(),
            };

            return setCategories({ transformedCategories, category: transformedCategories.category });
        }

        return setCategories({ transformedCategories, category });
    }, {} as TransformedCategories);
}
