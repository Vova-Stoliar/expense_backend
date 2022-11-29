import { HttpStatus } from '@nestjs/common';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { IErrorResponse } from '~/app/filters/prisma/types';

export class ErrorResponseP2002 implements IErrorResponse {
    statusCode = HttpStatus.BAD_REQUEST;
    message: string;

    constructor(exception: PrismaClientKnownRequestError) {
        this.message = `Unique constraint failed on the "${exception.meta?.['target']}"`;
    }
}
