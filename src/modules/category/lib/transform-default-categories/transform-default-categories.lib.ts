import { v4 as uuid } from 'uuid';
import { setTransformedCategoriesLibs, transformCategory } from '~/modules/category/lib';
import type { TransformDefaultCategories } from './transform-default-categories.types';
import type { TransformedCategories } from '~/modules/category/types';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import type { Category, PartialOnly } from '~/shared/types';

export function transformDefaultCategories(params: TransformDefaultCategories) {
    const { categories, otherCategory } = transformCategories(params);

    return getCategories({ categories, otherCategory });
}

function transformCategories(params: TransformDefaultCategories) {
    const { categories } = params;

    const { setCategories, setOtherCategory } = setTransformedCategoriesLibs();

    return categories.reduce((transformedCategories, category) => {
        const transformedCategory = transformCategory({ category, dateTime: getDateISOSting() });

        if (DEFAULT_CATEGORIES.other === category.name) {
            setOtherCategory({ transformedCategories, category: transformedCategory });
        }

        return setCategories({ transformedCategories, category: transformedCategory });
    }, {} as PartialOnly<TransformedCategories, 'otherCategory'>);
}

const getDateISOSting = (() => {
    return () => new Date().toISOString();
})();

const getCategories = (params: PartialOnly<TransformedCategories, 'otherCategory'>) => {
    const { categories, otherCategory } = params;

    if (!otherCategory) return [...categories, createDefaultOtherCategory()];

    return categories;
};

function createDefaultOtherCategory(): Category {
    return {
        name: DEFAULT_CATEGORIES.other,
        notes: '',
        amount: 0,
        createdAt: getDateISOSting(),
        updatedAt: getDateISOSting(),
        id: uuid(),
    };
}
