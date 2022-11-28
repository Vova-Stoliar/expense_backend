import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { MESSAGES } from '~/shared/constants';
import { UserRepository } from '~/shared/repositories/user';
import type { BaseUser, KeysOfType } from '~/shared/types';

type AcceptValue = KeysOfType<User>;
type ReturnValue = Promise<BaseUser>;

@Injectable()
export class ValidateUserExistenceByField implements PipeTransform<AcceptValue, ReturnValue> {
    constructor(private userRepository: UserRepository) {}

    async transform(value: AcceptValue, metadata: ArgumentMetadata): ReturnValue {
        const propertyField = metadata.data;

        if (propertyField === undefined) throw new NotFoundError(MESSAGES.notFond({ property: 'User' }));

        return this.userRepository.findFirstOrThrow({
            where: { [propertyField]: value },
            include: {
                token: true,
            },
        });
    }
}
