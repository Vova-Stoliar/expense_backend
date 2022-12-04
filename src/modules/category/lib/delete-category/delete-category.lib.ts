import { setTransformedCategoriesLibs } from '~/modules/category/lib';
import type { TransformedCategories } from '~/modules/category/types';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import type { Category } from '~/shared/types';
import type { DeleteCategory, HandleOtherCategoryParams, UpdateOtherCategory } from './delete-category.types';

export function deleteCategory(params: DeleteCategory): TransformedCategories {
    const { categoryToDelete, categories } = params;
    const { setCategories } = setTransformedCategoriesLibs();

    return categories.reduce((transformedCategories, category) => {
        if (category.name === DEFAULT_CATEGORIES.other) {
            return handleOtherCategory({
                otherCategory: updateOtherCategory({ categoryToDelete, otherCategory: category }),
                transformedCategories,
            });
        }

        return setCategories({ transformedCategories, category });
    }, {} as TransformedCategories);
}

function handleOtherCategory(params: HandleOtherCategoryParams) {
    const { setCategories, setOtherCategory } = setTransformedCategoriesLibs();
    const { otherCategory, transformedCategories } = params;

    setOtherCategory({
        transformedCategories,
        category: otherCategory,
    });

    return setCategories({ transformedCategories, category: otherCategory });
}

function updateOtherCategory(params: UpdateOtherCategory): Category {
    const { categoryToDelete, otherCategory } = params;

    return {
        ...otherCategory,
        updatedAt: new Date().toISOString(),
        amount: otherCategory.amount + categoryToDelete.amount,
    };
}
