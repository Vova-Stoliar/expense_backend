import type { PipeTransform } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Tokens } from '~/modules/auth/types';

type AcceptValue = Tokens['refreshToken'];
type ReturnValue = AcceptValue;

@Injectable()
export class ValidateRefreshTokenPipe implements PipeTransform<AcceptValue, ReturnValue> {
    transform(refreshToken: AcceptValue): ReturnValue {
        if (!refreshToken) throw new UnauthorizedException();

        return refreshToken;
    }
}
