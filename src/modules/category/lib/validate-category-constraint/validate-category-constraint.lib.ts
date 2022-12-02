import { BadRequestException } from '@nestjs/common';
import type { ValidateCategoryConstraintParams } from '~/modules/category/types';
import { DEFAULT_CATEGORIES } from '~/shared/constants';

export function validateCategoryConstraint(params: ValidateCategoryConstraintParams) {
    const { categories, categoryToValidateId } = params;

    const isOtherCategory = categories.some(({ name, id }) => {
        return name === DEFAULT_CATEGORIES.other && id === categoryToValidateId;
    });

    if (isOtherCategory) throw new BadRequestException();
}
