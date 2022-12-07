import { applyDecorators, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { getSwaggerParamExample } from '~/modules/category/constants/swagger';
import { generateCategory } from '~/shared/constants/test';

export function Update() {
    return applyDecorators(
        Patch(':id'),
        ApiOkResponse({ schema: { example: generateCategory() } }),
        ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() })
    );
}
