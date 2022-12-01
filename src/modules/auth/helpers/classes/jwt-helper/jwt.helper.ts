import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomConfigService } from '~/shared/modules';
import type { JwtPayload, Tokens } from '~/shared/types';

@Injectable()
export class JwtHelper {
    constructor(private customConfigService: CustomConfigService, private jwtService: JwtService) {}

    private ACCESS_TOKEN_EXPIRES_IN = '3d';
    private REFRESH_TOKEN_EXPIRES_IN = '7d';

    private getJwtPayload(params: Omit<JwtPayload, 'createdAt'>): JwtPayload {
        return {
            createdAt: new Date().toISOString(),
            ...params,
        };
    }

    async getTokens(params: Omit<JwtPayload, 'createdAt'>): Promise<Tokens & Pick<JwtPayload, 'createdAt'>> {
        const payload = this.getJwtPayload(params);

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.customConfigService.ACCESS_TOKEN_SECRET,
                expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
            }),
            this.jwtService.signAsync(payload, {
                secret: this.customConfigService.REFRESH_TOKEN_SECRET,
                expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
            }),
        ]);

        return {
            accessToken,
            refreshToken,
            createdAt: payload.createdAt,
        };
    }
}
