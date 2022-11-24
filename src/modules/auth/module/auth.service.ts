import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import type { IUserDto, IUserToLoginDto, JwtPayload, Tokens } from '~/modules/auth/types';
import { UserRepository } from '~/repositories/user';
import { MESSAGES } from '~/shared/constants';
import { CustomConfigService } from '~/shared/modules/config';

// TODO use object to pass params

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private customConfigService: CustomConfigService,
        private jwtService: JwtService
    ) {}

    // TODO move to another directory
    async getTokens(params: JwtPayload): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(params, {
                secret: 'AT_SECRET',
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(params, {
                secret: 'RT_SECRET',
                expiresIn: '7d',
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async login(userToLogin: IUserToLoginDto) {
        const { accessToken, refreshToken } = await this.getTokens({ id: userToLogin.id, email: userToLogin.email });

        const hashRefreshToken = await hash(refreshToken, this.customConfigService.BCRYPT_SALT_ROUNDS);

        await this.userRepository.update({
            where: {
                id: userToLogin.id,
            },
            data: {
                hashedRefreshToken: hashRefreshToken,
            },
        });

        return { accessToken, refreshToken };
    }

    async refresh(params: Pick<User, 'id'> & Pick<Tokens, 'refreshToken'>) {
        const { id, refreshToken } = params;

        const user = await this.userRepository.findUnique({ where: { id }, select: { hashedRefreshToken: true } });

        if (!user?.hashedRefreshToken) throw new ForbiddenException(MESSAGES.notExist({ property: 'User' }));

        const isRefreshTokenValid = await compare(refreshToken, user.hashedRefreshToken);

        if (!isRefreshTokenValid) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens({ id: user.id, email: user.email });

        const hashedRefreshToken = await hash(refreshToken, this.customConfigService.BCRYPT_SALT_ROUNDS);

        await this.userRepository.update({
            where: {
                id: user.id,
            },
            data: {
                hashedRefreshToken,
            },
        });

        return tokens;
    }

    async signup(userToSignUp: IUserDto) {
        const { displayName, userName, email, password } = userToSignUp;

        const hashedPassword = await hash(password, this.customConfigService.BCRYPT_SALT_ROUNDS);

        const user = await this.userRepository.create({
            data: {
                password: hashedPassword,
                email,
                userName,
                displayName,
            },
        });

        const { accessToken, refreshToken } = await this.getTokens({
            id: user.id,
            email: user.email,
        });

        const hashRefreshToken = await hash(refreshToken, this.customConfigService.BCRYPT_SALT_ROUNDS);

        await this.userRepository.update({
            where: {
                id: user.id,
            },
            data: {
                hashedRefreshToken: hashRefreshToken,
            },
        });

        return { accessToken, refreshToken, user };
    }

    async logout({ id }: Pick<User, 'id'>) {
        return this.userRepository.updateMany({
            where: {
                id,
                hashedRefreshToken: {
                    not: null,
                },
            },
            data: { hashedRefreshToken: null },
        });
    }
}
