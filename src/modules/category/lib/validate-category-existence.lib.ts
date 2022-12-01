import { BadRequestException } from '@nestjs/common';
import type { ValidateCategoryExistenceParams } from '~/modules/category/types';
import { MESSAGES } from '~/shared/constants';

export function validateCategoryExistence(params: ValidateCategoryExistenceParams) {
    const { matchCategoryCallback, categories } = params;

    const category = categories.find(matchCategoryCallback);

    if (category) throw new BadRequestException(MESSAGES.doesExist({ property: category.name }));
}
