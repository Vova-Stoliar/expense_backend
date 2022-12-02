import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { WithUndefined } from '~/shared/types';

export const GetUserFromReqPropertyByKey = createParamDecorator(
    (key: WithUndefined<keyof User>, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        if (!key) return request.user;

        return request.user[key];
    }
);
