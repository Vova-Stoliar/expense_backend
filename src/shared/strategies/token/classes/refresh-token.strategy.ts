import { ForbiddenException, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGIES_NAMES } from '~/shared/constants';
import { CustomConfigService } from '~/shared/modules/config';
import { TokenRepository } from '~/shared/repositories/token';
import { validateRefreshToken } from '~/shared/strategies/token/lib';
import type { JwtPayload, JwtPayloadWithRefreshToken } from '~/shared/types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, STRATEGIES_NAMES.refreshToken) {
    constructor(customConfigService: CustomConfigService, private tokenRepository: TokenRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: customConfigService.REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtPayload): Promise<JwtPayloadWithRefreshToken> {
        const { id } = payload;
        const [_keyword, refreshToken] = req.get('authorization')?.split(' ') ?? [];

        if (!refreshToken) throw new UnauthorizedException();

        const token = await this.tokenRepository.findUnique({
            where: { userId: id },
            select: { hashedRefreshToken: true },
        });

        await validateRefreshToken({ refreshToken, hashedRefreshToken: token?.hashedRefreshToken ?? '' });

        return {
            ...payload,
            refreshToken,
        };
    }
}
