import type { PipeTransform } from '@nestjs/common';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import type { IUserToLoginDto, UserPasswordPipeValue } from '~/modules/auth/types';
import { MESSAGES } from '~/shared/constants';

@Injectable()
export class ValidateUserPasswordPipe implements PipeTransform<UserPasswordPipeValue, Promise<IUserToLoginDto>> {
    async transform(value: UserPasswordPipeValue) {
        const { encryptedPassword, password } = value;

        const passwordMatches = await compare(password, encryptedPassword);

        if (!passwordMatches) throw new ForbiddenException(MESSAGES.notValid({ property: 'Password' }));

        return {
            password,
            id: value.id,
            email: value.email,
        };
    }
}
