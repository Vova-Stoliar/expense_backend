import type { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ErrorResponse } from '~/shared/filters/prisma/classes/error-response.class';
import {
    ErrorResponseP2002,
    ErrorResponseP2025,
    PRISMA_ERROR_CODES,
} from '~/shared/filters/prisma/filters/client-known-request-error';

export class ErrorResponseFactory {
    createMessage(exception: PrismaClientKnownRequestError) {
        if (exception.code === PRISMA_ERROR_CODES.P2002) return new ErrorResponseP2002(exception);

        if (exception.code === PRISMA_ERROR_CODES.P2025) return new ErrorResponseP2025(exception);

        return new ErrorResponse();
    }
}
