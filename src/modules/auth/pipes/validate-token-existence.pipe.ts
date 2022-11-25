import type { PipeTransform } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Tokens } from '~/shared/types';

type AcceptValue = Tokens['refreshToken'];
type ReturnValue = AcceptValue;

@Injectable()
export class ValidateTokenExistence implements PipeTransform<AcceptValue, ReturnValue> {
    transform(token: AcceptValue): ReturnValue {
        if (!token) throw new UnauthorizedException();

        return token;
    }
}
