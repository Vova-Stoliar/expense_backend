import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { Request } from 'express';

export const GetUserFromReq = createParamDecorator(
    (key: undefined, context: ExecutionContext): Omit<User, 'updatedAt' | 'createdAt'> => {
        const request = context.switchToHttp().getRequest<Request>();

        if (!request.user) throw new UnauthorizedException();

        return request.user as Omit<User, 'updatedAt' | 'createdAt'>;
    }
);
