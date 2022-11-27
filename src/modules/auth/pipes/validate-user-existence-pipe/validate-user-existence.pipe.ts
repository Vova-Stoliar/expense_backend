import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { WithPayload } from '~/modules/auth/types';
import { UserRepository } from '~/repositories/user';
import type { BaseUser, BaseUserWith, PartialPick } from '~/shared/types';

type AcceptValue = PartialPick<BaseUser, 'id' | 'email'>;
type ReturnValue = Promise<{ user: BaseUserWith<'password'> } & WithPayload<AcceptValue>>;

@Injectable()
export class ValidateUserExistence implements PipeTransform<AcceptValue, ReturnValue> {
    constructor(private userRepository: UserRepository) {}

    async transform(value: AcceptValue): ReturnValue {
        const { email, id } = value;

        const user = await this.userRepository.findUniqueOrThrow({
            where: { email, id },
            select: { password: true },
        });

        return {
            user,
            payload: value,
        };
    }
}
