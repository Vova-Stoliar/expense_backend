import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_STRATEGY_NAME } from '~/modules/auth/constants';
import type { JwtPayload } from '~/modules/auth/types';
import { CustomConfigService } from '~/shared/modules/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY_NAME) {
    constructor(customConfigService: CustomConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: customConfigService.ACCESS_TOKEN_SECRET,
        });
    }

    validate(payload: JwtPayload): JwtPayload {
        return payload;
    }
}
