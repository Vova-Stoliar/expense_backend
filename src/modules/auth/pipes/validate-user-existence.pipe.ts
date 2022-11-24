import type { PipeTransform } from '@nestjs/common';
import { ForbiddenException, Injectable } from '@nestjs/common';
import type { IUserToLoginDto, UserExistencePipeReturnValue } from '~/modules/auth/types';
import { UserRepository } from '~/repositories/user';
import { MESSAGES } from '~/shared/constants';

@Injectable()
export class ValidateUserExistencePipe implements PipeTransform<IUserToLoginDto, UserExistencePipeReturnValue> {
    constructor(private userRepository: UserRepository) {}

    async transform(value: IUserToLoginDto) {
        const { email } = value;

        const user = await this.userRepository.findUnique({ where: { email }, select: { password: true } });

        if (!user) throw new ForbiddenException(MESSAGES.notExist({ property: 'User' }));

        return {
            ...value,
            id: user.id,
            encryptedPassword: user.password,
        };
    }
}
