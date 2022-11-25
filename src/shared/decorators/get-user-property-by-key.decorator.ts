import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtPayloadWithRefreshToken, WithUndefined } from '~/shared/types';

export const GetUserPropertyByKey = createParamDecorator(
    (key: WithUndefined<keyof JwtPayloadWithRefreshToken>, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        if (!key) return request.user;

        return request.user[key];
    }
);
