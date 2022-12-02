import { getSetTransformedCategoriesLibs } from '~/modules/category/lib';
import type { DeleteCategory, SetTransformedCategories } from '~/modules/category/types';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import type { Category } from '~/shared/types';

interface TransformedCategories {
    categories: Category[];
    otherCategory: Category;
    deletedCategory: Category;
}

type UpdateOtherCategory = Pick<TransformedCategories, 'deletedCategory' | 'otherCategory'>;

export function deleteCategory(params: DeleteCategory) {
    const { categories, otherCategory, deletedCategory } = getTransformedCategories({
        categories: params.categories,
        categoryToDeleteId: params.categoryToDeleteId,
    });

    return [...categories, updateOtherCategory({ deletedCategory, otherCategory })];
}

function getTransformedCategories(params: DeleteCategory) {
    const { categoryToDeleteId, categories } = params;
    const { setCategories, setOtherCategory } = getSetTransformedCategoriesLibs();

    return categories.reduce((transformedCategories, category) => {
        if (category.id === categoryToDeleteId) return setCategoryToDelete({ transformedCategories, category });

        if (category.name === DEFAULT_CATEGORIES.other) {
            return setOtherCategory<TransformedCategories>({ transformedCategories, category });
        }

        return setCategories<TransformedCategories>({ transformedCategories, category });
    }, {} as TransformedCategories);
}

function setCategoryToDelete<T extends Pick<TransformedCategories, 'deletedCategory'>>(
    params: SetTransformedCategories<T>
) {
    const { transformedCategories, category } = params;

    return {
        ...transformedCategories,
        deletedCategory: category,
    };
}

function updateOtherCategory(params: UpdateOtherCategory): Category {
    const { deletedCategory, otherCategory } = params;

    return {
        ...otherCategory,
        updatedAt: new Date().toISOString(),
        amount: otherCategory.amount + deletedCategory.amount,
    };
}
