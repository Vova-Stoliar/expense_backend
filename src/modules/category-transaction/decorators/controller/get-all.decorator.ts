import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { getSwaggerParamExample, getSwaggerResponseExample } from '~/modules/category-transaction/constants/swagger';

export function GetAll() {
    return applyDecorators(
        Get(':categoryId'),
        ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() }),
        ApiOkResponse({ schema: { example: [getSwaggerResponseExample()] } })
    );
}
