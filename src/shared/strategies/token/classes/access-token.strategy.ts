import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
// TODO move repositories on lover level
import { TokenRepository } from '~/shared/repositories/token';
import { STRATEGIES_NAMES } from '~/shared/constants';
import { CustomConfigService } from '~/shared/modules/config';
import type { JwtPayload } from '~/shared/types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, STRATEGIES_NAMES.accessToken) {
    constructor(customConfigService: CustomConfigService, private tokenRepository: TokenRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: customConfigService.ACCESS_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtPayload): Promise<JwtPayload> {
        const { id } = payload;

        const token = await this.tokenRepository.findUnique({ where: { userId: id }, select: { updatedAt: true } });

        if (payload.createdAt !== token?.updatedAt.toISOString()) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
