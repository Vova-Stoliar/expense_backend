import type { PipeTransform } from '@nestjs/common';
import { ForbiddenException, Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { MESSAGES } from '~/shared/constants';

type AcceptValue = { user: Pick<User, 'password'> } & {
    payload: Pick<User, 'password'>;
};

@Injectable()
export class ValidateUserPasswordPipe implements PipeTransform<AcceptValue, Promise<void>> {
    async transform(value: AcceptValue) {
        const { password: hashedPassword } = value.user;
        const { password = '' } = value.payload;

        const passwordMatches = await compare(password, hashedPassword);

        if (!passwordMatches) throw new ForbiddenException(MESSAGES.notValid({ property: 'Password' }));
    }
}
