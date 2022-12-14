import { BadRequestException } from '@nestjs/common';
import type { ValidateCategory } from './validate-category-constraint.types';
import { DEFAULT_CATEGORIES } from '~/shared/constants';

export function validateCategoryConstraint(params: ValidateCategory) {
    const { categories, categoryToValidateId } = params;

    const isOtherCategory = categories.some(({ name, id }) => {
        return name === DEFAULT_CATEGORIES.other && id === categoryToValidateId;
    });

    if (isOtherCategory) throw new BadRequestException();
}
