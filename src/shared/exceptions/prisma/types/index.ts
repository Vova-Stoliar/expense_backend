import type { HttpStatus } from '@nestjs/common';

export interface IErrorResponse {
    statusCode: HttpStatus;
    message: string;
}
