import { v4 as uuid } from 'uuid';
import type { GetTransformCategoryParams } from '~/modules/category/types';
import type { Category } from '~/shared/types';

export function getTransformedCategory(params: GetTransformCategoryParams): Category {
    return {
        ...params.category,
        createdAt: params.dateTime,
        updatedAt: params.dateTime,
        id: uuid(),
    };
}
