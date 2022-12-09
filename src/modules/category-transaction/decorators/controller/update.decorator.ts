import * as NestCommon from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { getSwaggerParamExample, getSwaggerResponseExample } from '~/modules/category-transaction/constants/swagger';

export function Update() {
    return NestCommon.applyDecorators(
        NestCommon.Patch(':categoryId/:transactionId'),
        ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() }),
        ApiParam({ name: 'transactionId', required: true, example: getSwaggerParamExample() }),
        ApiOkResponse({ schema: { example: getSwaggerResponseExample() } })
    );
}
