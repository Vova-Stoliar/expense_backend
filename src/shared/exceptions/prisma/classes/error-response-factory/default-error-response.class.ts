import { HttpStatus } from '@nestjs/common';
import type { IErrorResponse } from '~/shared/exceptions/prisma/types';

export class DefaultErrorResponse implements IErrorResponse {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    message = 'Internal server error';
}
