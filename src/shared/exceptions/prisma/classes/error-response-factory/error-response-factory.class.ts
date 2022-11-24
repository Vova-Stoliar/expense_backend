import type { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DefaultErrorResponse, ErrorResponseP2002, ErrorResponseP2025 } from '~/shared/exceptions/prisma/classes';
import { PRISMA_ERROR_CODES } from '~/shared/exceptions/prisma/constants';

export class ErrorResponseFactory {
    createMessage(exception: PrismaClientKnownRequestError) {
        if (exception.code === PRISMA_ERROR_CODES.P2002) return new ErrorResponseP2002(exception);

        if (exception.code === PRISMA_ERROR_CODES.P2025) return new ErrorResponseP2025(exception);

        return new DefaultErrorResponse();
    }
}
