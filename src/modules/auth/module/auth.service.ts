import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import type { IUserDto } from '~/modules/auth/types';
import { UserRepository } from '~/repositories/user';
import { CustomConfigService } from '~/shared/modules/config';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private customConfigService: CustomConfigService) {}

    login() {
        return ' ';
    }

    async signup(user: IUserDto) {
        const { displayName, userName, email, password } = user;

        const hashedPassword = await hash(password, this.customConfigService.BCRYPT_SALT_ROUNDS);

        return this.userRepository.create({
            data: {
                password: hashedPassword,
                email,
                userName,
                displayName,
            },
        });
    }

    logout() {
        return `logout`;
    }
}
