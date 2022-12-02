import type { SetTransformedCategories } from '~/modules/category/types';
import type { Category } from '~/shared/types';

interface TransformedCategories {
    categories?: Category[];
    otherCategory?: Category;
}

export const getSetTransformedCategoriesLibs = () => {
    return { setCategories, setOtherCategory };
};

function setOtherCategory<T extends Pick<TransformedCategories, 'otherCategory'>>(
    params: SetTransformedCategories<T>
): Pick<TransformedCategories, 'otherCategory'> & T {
    const { transformedCategories, category } = params;

    return {
        ...transformedCategories,
        otherCategory: category,
    };
}

function setCategories<T extends Pick<TransformedCategories, 'categories'>>(
    params: SetTransformedCategories<T>
): Pick<TransformedCategories, 'categories'> & T {
    const { transformedCategories, category } = params;
    const { categories = [] } = transformedCategories;

    return {
        ...transformedCategories,
        categories: [...categories, category],
    };
}
