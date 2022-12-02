import { v4 as uuid } from 'uuid';
import { getSetTransformedCategoriesLibs, getTransformCategory } from '~/modules/category/lib';
import type { TransformDefaultCategories } from '~/modules/category/types';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import type { Category, DateTime } from '~/shared/types';

interface TransformedCategories {
    categories: Category[];
    otherCategory: Category;
    deletedCategory: Category;
}

interface GetTransformedCategories extends Pick<TransformDefaultCategories, 'categories'> {
    dateTime: DateTime['updatedAt'];
}

export function transformDefaultCategories(params: TransformDefaultCategories) {
    const dateTime = new Date().toISOString();

    const transformedCategories = getTransformedCategories({ categories: params.categories, dateTime });

    const { categories, otherCategory = createDefaultOtherCategory({ dateTime }) } = transformedCategories;

    return [...categories, otherCategory];
}

function getTransformedCategories(params: GetTransformedCategories) {
    const { categories, dateTime } = params;
    const { setCategories, setOtherCategory } = getSetTransformedCategoriesLibs();

    return categories.reduce((transformedCategories, defaultCategory) => {
        const category = getTransformCategory({
            category: defaultCategory,
            dateTime,
        });

        if (DEFAULT_CATEGORIES.other === defaultCategory.name) {
            return setOtherCategory<TransformedCategories>({ transformedCategories, category });
        }

        return setCategories<TransformedCategories>({ transformedCategories, category });
    }, {} as TransformedCategories);
}

function createDefaultOtherCategory({ dateTime }: { dateTime: Category['createdAt'] }): Category {
    return {
        name: DEFAULT_CATEGORIES.other,
        notes: '',
        amount: 0,
        createdAt: dateTime,
        updatedAt: dateTime,
        id: uuid(),
    };
}
