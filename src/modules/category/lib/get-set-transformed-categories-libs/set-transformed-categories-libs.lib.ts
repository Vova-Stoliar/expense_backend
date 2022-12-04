import type { SetTransformedCategories } from './set-transformed-categories-libs.types';
import type { TransformedCategories } from '~/modules/category/types';
import type { PartialPick } from '~/shared/types';

export const setTransformedCategoriesLibs = () => {
    return { setCategories, setOtherCategory };
};

function setOtherCategory<T extends PartialPick<TransformedCategories, 'otherCategory'>>(
    params: SetTransformedCategories<T>
): Pick<TransformedCategories, 'otherCategory'> & T {
    const { transformedCategories, category } = params;

    return {
        ...transformedCategories,
        otherCategory: category,
    };
}

function setCategories<T extends PartialPick<TransformedCategories, 'categories'>>(
    params: SetTransformedCategories<T>
): Pick<TransformedCategories, 'categories'> & T {
    const { transformedCategories, category } = params;
    const { categories = [] } = transformedCategories;

    return {
        ...transformedCategories,
        categories: [...categories, category],
    };
}
