import * as NestCommon from '@nestjs/common';
import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { getSwaggerSchemaExample } from '~/modules/auth/constants/swagger';
import { Public } from '~/shared/decorators';

export function Signup() {
    return applyDecorators(
        Public(),
        NestCommon.Post('signup'),
        HttpCode(HttpStatus.CREATED),
        ApiCreatedResponse({ schema: { example: getSwaggerSchemaExample() } })
    );
}
