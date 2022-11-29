import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '~/app/modules/casl/module/casl-ability.factory';
import { DECORATORS_KEYS } from '~/shared/constants';
import { validateIsValueDefined } from '~/shared/lib';
import type { PolicyHandler } from '~/shared/types';

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(DECORATORS_KEYS.public, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const policyHandlers =
            this.reflector.get<PolicyHandler[] | undefined>(DECORATORS_KEYS.checkPolicies, context.getHandler()) ?? [];

        const request = context.switchToHttp().getRequest();

        const user = validateIsValueDefined({ value: request.user, error: new UnauthorizedException() });

        const ability = this.caslAbilityFactory.createForUser(user);

        return policyHandlers.every((handler) => handler(ability));
    }
}
