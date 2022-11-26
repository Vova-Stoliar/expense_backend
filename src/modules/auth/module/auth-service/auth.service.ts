import { Injectable } from '@nestjs/common';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade.helper';
import { validateRefreshToken } from '~/modules/auth/lib';
import type { IUserToLoginDto, IUserUserToSignupDto } from '~/modules/auth/types';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';

@Injectable()
export class AuthService {
    constructor(private authFacadeHelper: AuthFacadeHelper) {}

    async login(userToLogin: IUserToLoginDto): Promise<Tokens> {
        const { id, email } = userToLogin;

        const tokens = await this.authFacadeHelper.getTokens({ id, email });

        const hashedRefreshToken = await this.authFacadeHelper.getHashedRefreshToken({
            refreshToken: tokens.refreshToken,
        });

        await this.authFacadeHelper.updateHashedRefreshTokenById({ id, hashedRefreshToken });

        return tokens;
    }

    async refresh(params: { user: BaseUserWith<'hashedRefreshToken'> } & Pick<Tokens, 'refreshToken'>) {
        const { user, refreshToken } = params;

        await validateRefreshToken({
            refreshToken,
            hashedRefreshToken: user.hashedRefreshToken ?? '',
        });

        const tokens = await this.authFacadeHelper.getTokens({ id: user.id, email: user.email });

        const hashedRefreshToken = await this.authFacadeHelper.getHashedRefreshToken({
            refreshToken: tokens.refreshToken,
        });

        await this.authFacadeHelper.updateHashedRefreshTokenById({ id: user.id, hashedRefreshToken });

        return tokens;
    }

    async signup(userToSignUp: IUserUserToSignupDto): Promise<{ user: BaseUser } & Tokens> {
        const { displayName, userName, email, password } = userToSignUp;

        const user = await this.authFacadeHelper.createUser({ email, userName, displayName, password });

        const tokens = await this.authFacadeHelper.getTokens({ id: user.id, email: user.email });

        const hashedRefreshToken = await this.authFacadeHelper.getHashedRefreshToken({
            refreshToken: tokens.refreshToken,
        });

        await this.authFacadeHelper.updateHashedRefreshTokenById({ id: user.id, hashedRefreshToken });

        return { ...tokens, user };
    }

    async logout({ id }: Pick<BaseUser, 'id'>): Promise<void> {
        await this.authFacadeHelper.deleteRefreshTokenById({ id });
    }
}