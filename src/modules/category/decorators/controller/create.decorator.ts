import { applyDecorators, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { generateCategory } from '~/shared/constants/test';

export function Create() {
    return applyDecorators(Post(), ApiCreatedResponse({ schema: { example: generateCategory() } }));
}
