import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { generateCategory } from '~/shared/constants/test';

export function GetAll() {
    return applyDecorators(Get(), ApiOkResponse({ schema: { example: [generateCategory()] } }));
}
