import { applyDecorators, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { getSwaggerParamExample, getSwaggerResponseExample } from '~/modules/category-transaction/constants/swagger';

export function Create() {
    return applyDecorators(
        Post(':categoryId'),
        HttpCode(HttpStatus.CREATED),
        ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() }),
        ApiCreatedResponse({ schema: { example: getSwaggerResponseExample() } })
    );
}
