import * as NestCommon from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Logout() {
    return applyDecorators(
        ApiBearerAuth(),
        NestCommon.Get('logout'),
        NestCommon.HttpCode(NestCommon.HttpStatus.NO_CONTENT)
    );
}
