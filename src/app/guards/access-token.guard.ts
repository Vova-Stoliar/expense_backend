import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DECORATORS_KEYS, STRATEGIES_NAMES } from '~/shared/constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard(STRATEGIES_NAMES.accessToken) {
    constructor(private reflector: Reflector) {
        super();
    }

    override canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(DECORATORS_KEYS.public, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        return super.canActivate(context);
    }
}
