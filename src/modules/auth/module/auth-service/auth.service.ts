import { Injectable } from '@nestjs/common';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import type { IUserToLogin, IUserToResetPassword, IUserUserToSignup } from '~/modules/auth/types';
import type { BaseUser, Tokens } from '~/shared/types';

@Injectable()
export class AuthService {
    constructor(private authFacadeHelper: AuthFacadeHelper) {}

    async login(userToLogin: IUserToLogin): Promise<Tokens> {
        const { id, email } = userToLogin;

        const { createdAt, refreshToken, accessToken } = await this.authFacadeHelper.getTokens({ id, email });

        const hashedRefreshToken = await this.authFacadeHelper.getHashedRefreshToken({
            refreshToken,
        });

        await this.authFacadeHelper.updateHashedRefreshToken({ userId: id, hashedRefreshToken, updatedAt: createdAt });

        return { refreshToken, accessToken };
    }

    async refresh(user: Pick<BaseUser, 'email' | 'id'>) {
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

    async signup(userToSignUp: IUserUserToSignup): Promise<{ user: BaseUser } & Tokens> {
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

    async logout({ id }: Pick<BaseUser, 'id'>): Promise<void> {
        await this.authFacadeHelper.deleteRefreshToken({ id });
    }

    async resetPassword(user: IUserToResetPassword): Promise<{ user: BaseUser } & Tokens> {
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
