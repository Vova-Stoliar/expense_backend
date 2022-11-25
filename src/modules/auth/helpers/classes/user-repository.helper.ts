import { Injectable } from '@nestjs/common';
import { BcryptHelper } from '~/modules/auth/helpers';
import { UserRepository } from '~/repositories/user';
import type { BaseUserWith } from '~/shared/types';

@Injectable()
export class UserRepositoryHelper {
    constructor(private userRepository: UserRepository, private bcryptHelper: BcryptHelper) {}

    async createUser(user: Omit<BaseUserWith<'password'>, 'id'>) {
        const { displayName, userName, email, password } = user;

        const hashedPassword = await this.bcryptHelper.getHashedPassword({ password });

        return this.userRepository.create({
            data: {
                password: hashedPassword,
                email,
                userName,
                displayName,
            },
        });
    }
}
