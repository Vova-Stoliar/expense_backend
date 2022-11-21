import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import type { UserToCreate } from '~/auth/types';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class AuthService {
    // TODO: check passwords (password and confirmPassword)
    // TODO: use salt rounds from .env

    constructor(private primaService: PrismaService) {}

    async hashPassword({ password }: Pick<User, 'password'>) {
        return bcrypt.hash(password, 10);
    }

    async signUpLocal(userToCreate: UserToCreate) {
        const { password, userName, displayName, email } = userToCreate;

        // TODO: can I use Rx.js ?
        const hashedPassword = await this.hashPassword({ password });

        const user = await this.primaService.user.create({
            data: {
                email,
                displayName,
                userName,
                password: hashedPassword,
            },
        });

        console.log('-> user', user);

        return userToCreate;
    }

    signInLocal() {
        return '';
    }

    logout() {
        return '';
    }

    refreshTokens() {
        return '';
    }
}
