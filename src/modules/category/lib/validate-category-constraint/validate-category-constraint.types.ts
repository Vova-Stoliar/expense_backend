import type { Category } from '~/shared/types';

export interface ValidateCategory {
    categories: Category[];
    categoryToValidateId: Category['id'];
}
