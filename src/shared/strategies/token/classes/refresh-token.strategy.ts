import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGIES_NAMES } from '~/shared/constants';
import { CustomConfigService } from '~/shared/modules/config';
import { TokenRepository } from '~/shared/repositories/token';
import { validateRefreshTokens } from '~/shared/strategies/token/lib';
import type { BaseUser, JwtPayload, Tokens } from '~/shared/types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, STRATEGIES_NAMES.refreshToken) {
    constructor(customConfigService: CustomConfigService, private tokenRepository: TokenRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: customConfigService.REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtPayload): Promise<JwtPayload> {
        const { id } = payload;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_keyword, refreshToken] = req.get('authorization')?.split(' ') ?? [];

        await this.validateRefreshToken({ refreshToken, userId: id });

        return payload;
    }

    private async validateRefreshToken(params: { refreshToken: Tokens['refreshToken']; userId: BaseUser['id'] }) {
        const { refreshToken, userId } = params;

        if (!refreshToken) throw new UnauthorizedException();

        const token = await this.tokenRepository.findUnique({
            where: { userId },
            select: { hashedRefreshToken: true },
        });

        await validateRefreshTokens({ refreshToken, hashedRefreshToken: token?.hashedRefreshToken ?? '' });
    }
}
