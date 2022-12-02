import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { UserToLoginDto, UserToResetPasswordDto, UserToSignupDto } from '~/modules/auth/dto';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import type { BaseUser, Tokens } from '~/shared/types';

@Injectable()
export class AuthService {
    constructor(private authFacadeHelper: AuthFacadeHelper) {}

    async login(userToLogin: UserToLoginDto): Promise<{ user: BaseUser } & Tokens> {
        const { email, password } = userToLogin;

        const user = await this.authFacadeHelper.validateUserPassword({ email, password });

        const { createdAt, refreshToken, accessToken } = await this.authFacadeHelper.getTokens({ id: user.id, email });

        const hashedRefreshToken = await this.authFacadeHelper.getHashedRefreshToken({
            refreshToken,
        });

        await this.authFacadeHelper.updateHashedRefreshToken({
            userId: user.id,
            hashedRefreshToken,
            updatedAt: createdAt,
        });

        return { refreshToken, accessToken, user };
    }

    async refresh(user: Pick<User, 'email' | 'id'>) {
        const { refreshToken, accessToken, createdAt } = await this.authFacadeHelper.getTokens({
            id: user.id,
            email: user.email,
        });

        const hashedRefreshToken = await this.authFacadeHelper.getHashedRefreshToken({
            refreshToken,
        });

        await this.authFacadeHelper.updateHashedRefreshToken({
            userId: user.id,
            hashedRefreshToken,
            updatedAt: createdAt,
        });

        return { refreshToken, accessToken };
    }

    async signup(userToSignUp: UserToSignupDto): Promise<{ user: BaseUser } & Tokens> {
        const { displayName, userName, email, password } = userToSignUp;

        const user = await this.authFacadeHelper.createUser({ email, userName, displayName, password });

        const { refreshToken, accessToken, createdAt } = await this.authFacadeHelper.getTokens({
            id: user.id,
            email: user.email,
        });

        const hashedRefreshToken = await this.authFacadeHelper.getHashedRefreshToken({
            refreshToken,
        });

        await this.authFacadeHelper.createRefreshToken({ hashedRefreshToken, userId: user.id, updatedAt: createdAt });

        return { accessToken, refreshToken, user };
    }

    async logout({ id }: Pick<User, 'id'>): Promise<void> {
        await this.authFacadeHelper.deleteRefreshToken({ id });
    }

    async resetPassword(user: UserToResetPasswordDto): Promise<{ user: BaseUser } & Tokens> {
        const { id, password } = user;

        const { refreshToken, accessToken, createdAt } = await this.authFacadeHelper.getTokens({
            id: user.id,
            email: user.email,
        });

        const hashedRefreshToken = await this.authFacadeHelper.getHashedRefreshToken({
            refreshToken,
        });

        const updatedUser = await this.authFacadeHelper.updatePassword({ id, password });

        await this.authFacadeHelper.updateHashedRefreshToken({
            userId: user.id,
            hashedRefreshToken,
            updatedAt: createdAt,
        });

        return { user: updatedUser, accessToken, refreshToken };
    }
}
