import * as NestCommon from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { getSwaggerSchemaExample } from '~/modules/auth/constants/swagger';

export function ResetPassword() {
    return applyDecorators(
        ApiBearerAuth(),
        NestCommon.Post('resetPassword'),
        NestCommon.HttpCode(NestCommon.HttpStatus.OK),
        ApiOkResponse({ schema: { example: getSwaggerSchemaExample } })
    );
}
