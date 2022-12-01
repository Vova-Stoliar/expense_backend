import type { Category } from '~/shared/types';

interface TransformedCategories {
    categories: Category[];
    otherCategory?: Category;
}

interface SetTransformedCategoriesParams<T> {
    transformedCategories: T;
    category: Category;
}

export const getSetTransformedCategoriesLibs = () => {
    return { setCategories, setOtherCategory };
};

function setOtherCategory<T extends Pick<TransformedCategories, 'otherCategory'>>(
    params: SetTransformedCategoriesParams<T>
): Pick<TransformedCategories, 'otherCategory'> & T {
    const { transformedCategories, category } = params;

    return {
        ...transformedCategories,
        otherCategory: category,
    };
}

function setCategories<T extends Pick<TransformedCategories, 'categories'>>(
    params: SetTransformedCategoriesParams<T>
): Pick<TransformedCategories, 'categories'> & T {
    const { transformedCategories, category } = params;
    const { categories } = transformedCategories;

    return {
        ...transformedCategories,
        categories: [...categories, category],
    };
}
