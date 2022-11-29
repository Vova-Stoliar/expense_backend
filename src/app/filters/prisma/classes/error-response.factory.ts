import type { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ErrorResponseP2002 } from '~/app/filters/prisma/classes/error-response-P2002.class';
import { ErrorResponseP2025 } from '~/app/filters/prisma/classes/error-response-P2025.class';
import { ErrorResponse } from '~/app/filters/prisma/classes/error-response.class';
import { PRISMA_ERROR_CODES } from '~/app/filters/prisma/constants';

export class ErrorResponseFactory {
    createMessage(exception: PrismaClientKnownRequestError) {
        if (exception.code === PRISMA_ERROR_CODES.P2002) return new ErrorResponseP2002(exception);

        if (exception.code === PRISMA_ERROR_CODES.P2025) return new ErrorResponseP2025(exception);

        return new ErrorResponse();
    }
}
