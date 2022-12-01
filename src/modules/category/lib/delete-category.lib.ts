import { DEFAULT_CATEGORIES } from '~/modules/category/constants';
import { getSetTransformedCategoriesLibs } from '~/modules/category/lib';
import type { DeleteCategory } from '~/modules/category/types';
import type { Category } from '~/shared/types';

interface TransformedCategories {
    categories: Category[];
    otherCategory: Category;
    deletedCategory: Category;
}

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

function setCategoryToDelete(params: { transformedCategories: TransformedCategories; category: Category }) {
    const { transformedCategories, category } = params;

    transformedCategories.deletedCategory = category;

    return transformedCategories;
}

function updateOtherCategory(params: Pick<TransformedCategories, 'deletedCategory' | 'otherCategory'>): Category {
    const { deletedCategory, otherCategory } = params;

    return {
        ...otherCategory,
        updatedAt: new Date().toISOString(),
        amount: otherCategory.amount + deletedCategory.amount,
    };
}
