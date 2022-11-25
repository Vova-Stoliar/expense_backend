import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { WithPayload, IUserToLoginDto } from '~/modules/auth/types';
import { UserRepository } from '~/repositories/user';
import type { BaseUserWith } from '~/shared/types';

type AcceptValue = Pick<IUserToLoginDto, 'password' | 'email'>;
type ReturnValue = Promise<{ user: BaseUserWith<'password'> } & WithPayload<AcceptValue>>;

@Injectable()
export class ValidateUserExistence implements PipeTransform<AcceptValue, ReturnValue> {
    constructor(private userRepository: UserRepository) {}

    async transform(value: AcceptValue): ReturnValue {
        const { email } = value;

        const user = await this.userRepository.findFirstOrThrow({
            where: { email },
            select: { password: true },
        });

        return {
            user,
            payload: value,
        };
    }
}
