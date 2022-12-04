import { v4 as uuid } from 'uuid';
import type { TransformCategoryParams } from './transform-category.types';
import type { Category } from '~/shared/types';

export function transformCategory(params: TransformCategoryParams): Category {
    return {
        ...params.category,
        createdAt: params.dateTime,
        updatedAt: params.dateTime,
        id: uuid(),
    };
}
