import * as NestCommon from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { getSwaggerParamExample, getSwaggerResponseExample } from '~/modules/category-transaction/constants/swagger';

export function Get() {
    return applyDecorators(
        NestCommon.Get(':categoryId/:transactionId'),
        ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() }),
        ApiParam({ name: 'transactionId', required: true, example: getSwaggerParamExample() }),
        ApiOkResponse({ schema: { example: getSwaggerResponseExample() } })
    );
}
