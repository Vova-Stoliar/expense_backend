import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ErrorResponseFactory } from '~/shared/exceptions/prisma/classes';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        console.error(exception);

        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const response = new ErrorResponseFactory().createMessage(exception);

        return httpAdapter.reply(ctx.getResponse(), response, response.statusCode);
    }
}
