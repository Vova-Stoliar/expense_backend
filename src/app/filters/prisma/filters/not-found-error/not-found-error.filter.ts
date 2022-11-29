import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { NotFoundError } from '@prisma/client/runtime';
import { ErrorResponse } from '~/app/filters/prisma/classes/error-response.class';

@Catch(NotFoundError)
export class PrismaNotFoundErrorFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: NotFoundError, host: ArgumentsHost) {
        console.error(exception);

        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const response = new ErrorResponse(HttpStatus.BAD_REQUEST, exception.message);

        return httpAdapter.reply(ctx.getResponse(), response, response.statusCode);
    }
}
