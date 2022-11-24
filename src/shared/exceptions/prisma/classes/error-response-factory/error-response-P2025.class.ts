import { HttpStatus } from '@nestjs/common';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { IErrorResponse } from '~/shared/exceptions/prisma/types';

export class ErrorResponseP2025 implements IErrorResponse {
    statusCode = HttpStatus.BAD_REQUEST;
    message: string;

    constructor(exception: PrismaClientKnownRequestError) {
        this.message = exception.meta?.['cause'] as string;
    }
}
