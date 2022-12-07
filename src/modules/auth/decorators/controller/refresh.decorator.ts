import * as NestCommon from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { getSwaggerSchemaExample } from '~/modules/auth/constants/swagger';
import { RefreshToken } from '~/modules/auth/decorators';

export function Refresh() {
    return applyDecorators(
        ApiBearerAuth(),
        RefreshToken(),
        NestCommon.Get('refresh'),
        ApiOkResponse({ schema: { example: getSwaggerSchemaExample } })
    );
}
