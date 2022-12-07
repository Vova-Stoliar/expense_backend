import * as NestCommon from '@nestjs/common';
import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { getSwaggerSchemaExample } from '~/modules/auth/constants/swagger';
import { Public } from '~/shared/decorators';

export function Login() {
    return applyDecorators(
        Public(),
        NestCommon.Post('login'),
        HttpCode(HttpStatus.OK),
        ApiOkResponse({ schema: { example: getSwaggerSchemaExample } })
    );
}
