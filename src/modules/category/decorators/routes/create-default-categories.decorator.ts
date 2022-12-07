import { applyDecorators, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { getPolicyHandlers } from '~/modules/category/lib';
import { generateCategory } from '~/shared/constants/test';
import { CheckPolicies } from '~/shared/decorators/check-policies.decorator';

export function CreateDefaultCategories() {
    return applyDecorators(
        Post('default'),
        ApiCreatedResponse({ schema: { example: [generateCategory()] } }),
        CheckPolicies(getPolicyHandlers().createDefaultCategories)
    );
}
