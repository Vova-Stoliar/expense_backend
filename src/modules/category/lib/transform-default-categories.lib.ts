import { v4 as uuid } from 'uuid';
import { DEFAULT_CATEGORIES } from '~/modules/category/constants';
import { getSetTransformedCategoriesLibs } from '~/modules/category/lib';
import type { TransformDefaultCategories } from '~/modules/category/types';
import type { Category, DateTime } from '~/shared/types';

interface TransformedCategories {
    categories: Category[];
    otherCategory: Category;
    deletedCategory: Category;
}

interface AddCategoryCategoryFieldsParams {
    category: TransformDefaultCategories['categories'][0];
    dateTime: Category['createdAt'];
}

interface GetTransformedCategories extends Pick<TransformDefaultCategories, 'categories'> {
    dateTime: DateTime['updatedAt'];
}

export function transformDefaultCategories(params: TransformDefaultCategories) {
    const dateTime = new Date().toISOString();

    const transformedCategories = getTransformedCategories({ categories: params.categories, dateTime });

    const { categories, otherCategory = createDefaultOtherCategory({ dateTime }) } = transformedCategories;

    categories.push(otherCategory);

    return categories;
}

function getTransformedCategories(params: GetTransformedCategories) {
    const { categories, dateTime } = params;
    const { setCategories, setOtherCategory } = getSetTransformedCategoriesLibs();

    return categories.reduce((transformedCategories, defaultCategory) => {
        const category = transformCategory({
            category: defaultCategory,
            dateTime,
        });

        if (DEFAULT_CATEGORIES.other === defaultCategory.name) {
            return setOtherCategory<TransformedCategories>({ transformedCategories, category });
        }

        return setCategories<TransformedCategories>({ transformedCategories, category });
    }, {} as TransformedCategories);
}

function transformCategory(params: AddCategoryCategoryFieldsParams): Category {
    return {
        ...params.category,
        createdAt: params.dateTime,
        updatedAt: params.dateTime,
        id: uuid(),
    };
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
