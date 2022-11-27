import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { UserRepository } from '~/repositories/user';
import { MESSAGES } from '~/shared/constants';
import type { BaseUserWith, KeysOfType } from '~/shared/types';

type AcceptValue = KeysOfType<User>;
type ReturnValue = Promise<BaseUserWith<'hashedRefreshToken'>>;

@Injectable()
export class ValidateUserExistenceByField implements PipeTransform<AcceptValue, ReturnValue> {
    constructor(private userRepository: UserRepository) {}

    async transform(value: AcceptValue, metadata: ArgumentMetadata): ReturnValue {
        const propertyField = metadata.data;

        if (propertyField === undefined) throw new NotFoundError(MESSAGES.notFond({ property: 'User' }));

        return this.userRepository.findFirstOrThrow({
            where: { [propertyField]: value },
            select: { hashedRefreshToken: true },
        });
    }
}
