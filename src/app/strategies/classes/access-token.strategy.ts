import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { User } from '@prisma/client';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenHelper } from '~/app/strategies/helpers/token.helper';
import { STRATEGIES_NAMES } from '~/shared/constants';
import { CustomConfigService } from '~/shared/modules/config';
import type { JwtPayload } from '~/shared/types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, STRATEGIES_NAMES.accessToken) {
    constructor(customConfigService: CustomConfigService, private tokenHelper: TokenHelper) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: customConfigService.ACCESS_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtPayload): Promise<Omit<User, 'updatedAt' | 'createdAt'>> {
        return this.tokenHelper.validateTokenByUser(payload);
    }
}
