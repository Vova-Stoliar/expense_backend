import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from '~/shared/types';

export const GetUserFromReq = createParamDecorator((key: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) throw new UnauthorizedException();

    return request.user as JwtPayload;
});
