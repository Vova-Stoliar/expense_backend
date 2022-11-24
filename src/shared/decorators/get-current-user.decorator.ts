import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtPayload, Tokens } from '~/modules/auth/types';

// TODO: this is wrong for access token
export const GetCurrentUser = createParamDecorator(
    (data: keyof (JwtPayload & Pick<Tokens, 'refreshToken'>) | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (!data) return request.user;
        return request.user[data];
    }
);
