import * as NestCommon from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { getSwaggerParamExample } from '~/modules/category/constants/swagger';
import { generateCategory } from '~/shared/constants/test';

export function Delete() {
    return applyDecorators(
        NestCommon.Delete(':id'),
        ApiOkResponse({ schema: { example: [generateCategory()] } }),
        ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() })
    );
}
