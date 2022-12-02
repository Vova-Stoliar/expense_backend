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

        await this.authFacadeHelper.updateUser({ id: user.id, refreshTokenUpdatedAt: createdAt });

        return { refreshToken, accessToken, user };
    }

    async refresh(user: Pick<User, 'email' | 'id'>) {
        const { refreshToken, accessToken, createdAt } = await this.authFacadeHelper.getTokens({
            id: user.id,
            email: user.email,
        });

        await this.authFacadeHelper.updateUser({ id: user.id, refreshTokenUpdatedAt: createdAt });

        return { refreshToken, accessToken };
    }

    async signup(userToSignUp: UserToSignupDto): Promise<{ user: BaseUser } & Tokens> {
        const { displayName, userName, email, password } = userToSignUp;

        const user = await this.authFacadeHelper.createUser({ email, userName, displayName, password });

        const { refreshToken, accessToken, createdAt } = await this.authFacadeHelper.getTokens({
            id: user.id,
            email: user.email,
        });

        await this.authFacadeHelper.updateUser({ id: user.id, refreshTokenUpdatedAt: createdAt });

        return { accessToken, refreshToken, user };
    }

    async logout({ id }: Pick<User, 'id'>): Promise<void> {
        await this.authFacadeHelper.updateUser({
            id,
            refreshTokenUpdatedAt: new Date(new Date().toISOString()),
        });
    }

    async resetPassword(user: UserToResetPasswordDto): Promise<{ user: BaseUser } & Tokens> {
        const { id, password, email } = user;

        const { refreshToken, accessToken, createdAt } = await this.authFacadeHelper.getTokens({
            id,
            email,
        });

        const hashedPassword = await this.authFacadeHelper.getHashedPassword({ password });

        const updatedUser = await this.authFacadeHelper.updateUser({
            id,
            password: hashedPassword,
            refreshTokenUpdatedAt: createdAt,
        });

        return { user: updatedUser, accessToken, refreshToken };
    }
}
