import type { PipeTransform } from '@nestjs/common';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import type { IUserToLoginDto, WithPayload } from '~/modules/auth/types';
import { MESSAGES } from '~/shared/constants';
import type { BaseUserWith } from '~/shared/types';

type AcceptValue = { user: BaseUserWith<'password'> } & WithPayload<Pick<IUserToLoginDto, 'password' | 'email'>>;
type ReturnValue = Promise<IUserToLoginDto>;

@Injectable()
export class ValidateUserPassword implements PipeTransform<AcceptValue, ReturnValue> {
    async transform(value: AcceptValue): ReturnValue {
        const { user, payload } = value;
        const { password: hashedPassword } = user;
        const { password = '', email } = payload;

        const passwordMatches = await compare(password, hashedPassword);

        if (!passwordMatches) throw new ForbiddenException(MESSAGES.notValid({ property: 'Password' }));

        return { password, email, id: user.id };
    }
}
