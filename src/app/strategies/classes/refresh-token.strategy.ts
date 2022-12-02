import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { User } from '@prisma/client';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGIES_NAMES } from '~/shared/constants';
import { validateIsValueDefined } from '~/shared/lib';
import { CustomConfigService } from '~/shared/modules/config';
import { TokenRepository } from '~/shared/repositories/token';
import { validateRefreshTokens } from '~/app/strategies/lib';
import type { JwtPayload, Tokens } from '~/shared/types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, STRATEGIES_NAMES.refreshToken) {
    constructor(customConfigService: CustomConfigService, private tokenRepository: TokenRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: customConfigService.REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: JwtPayload): Promise<User> {
        const { id } = payload;
        const [_keyword, refreshToken] = req.get('authorization')?.split(' ') ?? [];

        return this.validateRefreshToken({ refreshToken, userId: id });
    }

    private async validateRefreshToken(params: {
        refreshToken: Tokens['refreshToken'];
        userId: User['id'];
    }): Promise<User> {
        const refreshToken = validateIsValueDefined<Tokens['refreshToken']>({
            value: params.refreshToken,
            error: new UnauthorizedException(),
        });

        const token = await this.validateTokeByUserId({ id: params.userId });

        await validateRefreshTokens({ refreshToken, hashedRefreshToken: token.hashedRefreshToken ?? '' });

        return token.user;
    }

    private async validateTokeByUserId({ id }: Pick<User, 'id'>) {
        const token = await this.tokenRepository.findUnique({
            where: { userId: id },
            select: { hashedRefreshToken: true, user: true },
        });

        return validateIsValueDefined({
            value: token,
            error: new UnauthorizedException(),
        });
    }
}
