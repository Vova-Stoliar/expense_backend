import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import type { BaseUserWith, BaseUser, IUserDto, IUserToLoginDto, JwtPayload, Tokens } from '~/modules/auth/types';
import { UserRepository } from '~/repositories/user';
import { CustomConfigService } from '~/shared/modules/config';

// TODO use object to pass params

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private customConfigService: CustomConfigService,
        private jwtService: JwtService
    ) {}

    private async getTokens(params: JwtPayload): Promise<Tokens> {
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

    private async updateHashedRefreshTokenById(params: Pick<BaseUser, 'id'> & Pick<User, 'hashedRefreshToken'>) {
        const { hashedRefreshToken, id } = params;

        return this.userRepository.update({ where: { id }, data: { hashedRefreshToken } });
    }

    private async getHashedRefreshToken({ refreshToken }: Pick<Tokens, 'refreshToken'>) {
        return await hash(refreshToken, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }

    private async getHashedPassword({ password }: Pick<User, 'password'>) {
        return await hash(password, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }

    private async createUser(userToCreate: Omit<BaseUser, 'id'> & { hashedPassword: IUserDto['password'] }) {
        const { displayName, userName, email, hashedPassword } = userToCreate;

        return this.userRepository.create({
            data: {
                password: hashedPassword,
                email,
                userName,
                displayName,
            },
        });
    }

    private async validateRefreshToken(
        param: { hashedRefreshToken: Tokens['refreshToken'] } & Pick<Tokens, 'refreshToken'>
    ) {
        const { hashedRefreshToken, refreshToken } = param;

        const isRefreshTokenValid = await compare(refreshToken, hashedRefreshToken);

        if (!isRefreshTokenValid) throw new UnauthorizedException();
    }

    async login(userToLogin: IUserToLoginDto) {
        const { id, email } = userToLogin;

        const tokens = await this.getTokens({ id, email });

        const hashedRefreshToken = await this.getHashedRefreshToken({ refreshToken: tokens.refreshToken });

        await this.updateHashedRefreshTokenById({ id, hashedRefreshToken });

        return tokens;
    }

    async refresh(params: { user: BaseUserWith<'hashedRefreshToken'> } & Pick<Tokens, 'refreshToken'>) {
        const { user, refreshToken } = params;

        await this.validateRefreshToken({ refreshToken, hashedRefreshToken: user.hashedRefreshToken ?? '' });

        const tokens = await this.getTokens({ id: user.id, email: user.email });

        const hashedRefreshToken = await this.getHashedRefreshToken({ refreshToken: tokens.refreshToken });

        await this.updateHashedRefreshTokenById({ id: user.id, hashedRefreshToken });

        return tokens;
    }

    async signup(userToSignUp: IUserDto) {
        const { displayName, userName, email, password } = userToSignUp;

        const hashedPassword = await this.getHashedPassword({ password });

        const user = await this.createUser({ email, userName, displayName, hashedPassword });

        const tokens = await this.getTokens({ id: user.id, email: user.email });

        const hashedRefreshToken = await this.getHashedRefreshToken({ refreshToken: tokens.refreshToken });

        await this.updateHashedRefreshTokenById({ id: user.id, hashedRefreshToken });

        return { ...tokens, user };
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
