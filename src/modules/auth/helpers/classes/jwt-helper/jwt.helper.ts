import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomConfigService } from '~/shared/modules';
import type { JwtPayload, Tokens } from '~/shared/types';

@Injectable()
export class JwtHelper {
    constructor(private customConfigService: CustomConfigService, private jwtService: JwtService) {}

    private ACCESS_TOKEN_EXPIRES_IN = '15m';
    private REFRESH_TOKEN_EXPIRES_IN = '7d';

    async getTokens(params: JwtPayload): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(params, {
                secret: this.customConfigService.ACCESS_TOKEN_SECRET,
                expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
            }),
            this.jwtService.signAsync(params, {
                secret: this.customConfigService.REFRESH_TOKEN_SECRET,
                expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
