import { BadRequestException } from '@nestjs/common';
import { DEFAULT_CATEGORIES } from '~/modules/category/constants';
import type { ValidateCategoryConstraintParams } from '~/modules/category/types';

export function validateCategoryConstraint(params: ValidateCategoryConstraintParams) {
    const { categories, categoryToValidateId } = params;

    const otherCategory = categories.find(({ name }) => name === DEFAULT_CATEGORIES.other);

    if (otherCategory?.id === categoryToValidateId) throw new BadRequestException();
}
