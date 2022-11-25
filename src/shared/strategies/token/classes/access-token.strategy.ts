import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGIES_NAMES } from '~/shared/constants';
import { CustomConfigService } from '~/shared/modules/config';
import type { JwtPayload } from '~/shared/types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, STRATEGIES_NAMES.accessToken) {
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
