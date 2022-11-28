import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { User } from '@prisma/client';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGIES_NAMES } from '~/shared/constants';
import { CustomConfigService } from '~/shared/modules/config';
import { TokenRepository } from '~/shared/repositories/token';
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

    async validate(req: Request, payload: JwtPayload): Promise<User> {
        return this.validateTokenByUser(payload);
    }

    private async validateTokenByUser(payload: JwtPayload): Promise<User> {
        const { id, createdAt } = payload;

        const token = await this.tokenRepository.findUnique({
            where: { userId: id },
            select: { updatedAt: true, user: true },
        });

        if (createdAt !== token?.updatedAt.toISOString()) {
            throw new UnauthorizedException();
        }

        return token.user;
    }
}
