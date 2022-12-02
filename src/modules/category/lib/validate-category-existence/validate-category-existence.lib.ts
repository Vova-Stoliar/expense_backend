import type { ValidateCategoryExistenceParams } from '~/modules/category/types';

export function validateCategoryExistence(params: ValidateCategoryExistenceParams) {
    const { matchCategoryCallback, categories, error } = params;

    const category = categories.find(matchCategoryCallback);

    if (category) throw error;
}
