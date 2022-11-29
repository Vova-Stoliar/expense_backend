import { HttpStatus } from '@nestjs/common';
import type { IErrorResponse } from '~/app/filters/prisma/types';

export class ErrorResponse implements IErrorResponse {
    constructor(public statusCode = HttpStatus.INTERNAL_SERVER_ERROR, public message = 'Internal server error') {}
}
