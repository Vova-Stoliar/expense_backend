import { v4 as uuid } from 'uuid';
import type { GetTransformCategoryParams } from '~/modules/category/types';
import type { Category } from '~/shared/types';

// TODO rename because there are getTransformCategory and getSetTransformedCategoriesLibs
export function getTransformCategory(params: GetTransformCategoryParams): Category {
    return {
        ...params.category,
        createdAt: params.dateTime,
        updatedAt: params.dateTime,
        id: uuid(),
    };
}
