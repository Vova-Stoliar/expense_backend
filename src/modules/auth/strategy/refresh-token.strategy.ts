import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGIES_NAMES } from '~/modules/auth/constants';
import type { JwtPayload, Tokens } from '~/modules/auth/types';
import { CustomConfigService } from '~/shared/modules/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, STRATEGIES_NAMES.refreshToken) {
    constructor(customConfigService: CustomConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: customConfigService.REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtPayload): JwtPayload & Pick<Tokens, 'refreshToken'> {
        const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();

        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

        return {
            ...payload,
            refreshToken,
        };
    }
}
