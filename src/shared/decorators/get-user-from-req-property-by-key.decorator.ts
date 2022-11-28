import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtPayload, WithUndefined } from '~/shared/types';

export const GetUserFromReqPropertyByKey = createParamDecorator(
    (key: WithUndefined<keyof JwtPayload>, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        if (!key) return request.user;

        return request.user[key];
    }
);