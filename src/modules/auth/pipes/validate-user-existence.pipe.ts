import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { BaseUser, WithPayload } from '~/modules/auth/types';
import { UserRepository } from '~/repositories/user';

type AcceptValue = User;
type ReturnValue = Promise<{ user: BaseUser & Pick<User, 'password'> } & WithPayload<AcceptValue>>;

@Injectable()
export class ValidateUserExistencePipe implements PipeTransform<AcceptValue, ReturnValue> {
    constructor(private userRepository: UserRepository) {}

    async transform(value: AcceptValue): ReturnValue {
        const { displayName, userName, email, id } = value;

        const user = await this.userRepository.findFirstOrThrow({
            where: { displayName, userName, email, id },
            select: { password: true },
        });

        return {
            user,
            payload: value,
        };
    }
}
