import * as NestCommon from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Controller() {
    return NestCommon.applyDecorators(ApiBearerAuth(), NestCommon.Controller('categories/transaction'));
}
