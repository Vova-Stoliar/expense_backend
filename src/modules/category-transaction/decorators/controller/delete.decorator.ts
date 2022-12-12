import * as NestCommon from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { getSwaggerParamExample } from '~/modules/category-transaction/constants/swagger';

export function Delete() {
    return NestCommon.applyDecorators(
        NestCommon.Delete(':categoryId/:transactionId'),
        ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() }),
        ApiParam({ name: 'transactionId', required: true, example: getSwaggerParamExample() }),
        NestCommon.HttpCode(NestCommon.HttpStatus.NO_CONTENT)
    );
}
