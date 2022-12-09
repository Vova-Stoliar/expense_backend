import type { SetTransformedCategories } from './set-transformed-categories-libs.types';
import type { TransformedCategories } from '~/modules/category/types';

export const setTransformedCategoriesLibs = () => {
    return { setCategories, setOtherCategory };
};

function setOtherCategory<T extends PartialPick<TransformedCategories, 'otherCategory'>>(
    params: SetTransformedCategories<T>
): T {
    const { transformedCategories, category } = params;

    transformedCategories.otherCategory = category;

    return transformedCategories;
}

function setCategories<T extends PartialPick<TransformedCategories, 'categories'>>(
    params: SetTransformedCategories<T>
): T {
    const { transformedCategories, category } = params;
    const { categories = [] } = transformedCategories;

    transformedCategories.categories = [...categories, category];

    return transformedCategories;
}
