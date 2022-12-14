import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '@prisma/client';

export const GetUserFromReqPropertyByKey = createParamDecorator(
    (key: WithUndefined<keyof Omit<User, 'updatedAt' | 'createdAt'>>, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        if (!key) return request.user;

        return request.user[key];
    }
);
