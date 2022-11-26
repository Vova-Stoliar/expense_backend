import { Test } from '@nestjs/testing';
import type { User } from '@prisma/client';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade.helper';
import * as validateRefreshTokenModule from '~/modules/auth/lib';
import { getAuthFacadeHelperMock } from '~/modules/auth/test/mocks';
import { getSignupReturnValue, getTokens, getUser } from '~/modules/auth/test/stubs';
import type { IUserToLoginDto, IUserUserToSignupDto } from '~/modules/auth/types';
import type { BaseUser } from '~/shared/types';
import { AuthService } from '../auth.service';

const getFunctionMock = <Token>(token: Token) => {
    const moduleMocker = new ModuleMocker(global);

    const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
    const Mock = moduleMocker.generateFromMetadata(mockMetadata);

    return new Mock();
};

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [AuthService],
    })
        .useMocker((token) => {
            if (token === AuthFacadeHelper) {
                return getAuthFacadeHelperMock();
            }

            if (typeof token === 'function') {
                return getFunctionMock(token);
            }
        })
        .compile();

    const authService = moduleRef.get<AuthService>(AuthService);

    return { authService };
};

describe('AuthService', () => {
    it('should be defined', async () => {
        const { authService } = await getMocks();

        expect(authService).toBeDefined();
    });

    describe('signup', () => {
        it('should return a "user", "refresh" and "access tokens"', async () => {
            const { authService } = await getMocks();

            const userToSignup: IUserUserToSignupDto = {
                email: getUser().email,
                userName: getUser().userName,
                displayName: getUser().displayName,
                password: getUser().password,
                confirmPassword: getUser().password,
            };

            expect(await authService.signup(userToSignup)).toStrictEqual(getSignupReturnValue());
        });
    });

    describe('logout', () => {
        it('should return "void"', async () => {
            const { authService } = await getMocks();

            expect(await authService.logout({ id: getUser().id })).toBe(void 0);
        });
    });

    describe('login', () => {
        it('should return a "user" and "tokens"', async () => {
            const { authService } = await getMocks();

            const userToLogin: IUserToLoginDto = {
                email: getUser().email,
                id: getUser().id,
                password: getUser().password,
            };

            expect(await authService.login(userToLogin)).toStrictEqual(getTokens());
        });
    });

    describe('refresh', () => {
        it('should return "tokens"', async () => {
            const { authService } = await getMocks();

            const user: BaseUser & { hashedRefreshToken: NonNullable<User['hashedRefreshToken']> } = {
                email: getUser().email,
                id: getUser().id,
                hashedRefreshToken: getUser().id,
                userName: getUser().userName,
                displayName: getUser().displayName,
            };

            jest.spyOn(validateRefreshTokenModule, 'validateRefreshToken').mockImplementation();

            expect(await authService.refresh({ user, refreshToken: getTokens().refreshToken })).toStrictEqual(
                getTokens()
            );
        });

        it('should throw error if "refresh token" is not valid', async () => {
            const { authService } = await getMocks();

            const user: BaseUser & { hashedRefreshToken: NonNullable<User['hashedRefreshToken']> } = {
                email: getUser().email,
                id: getUser().id,
                hashedRefreshToken: getUser().id,
                userName: getUser().userName,
                displayName: getUser().displayName,
            };

            jest.spyOn(validateRefreshTokenModule, 'validateRefreshToken').mockImplementation(() => {
                throw new TypeError();
            });

            await expect(() => authService.refresh({ user, refreshToken: getTokens().refreshToken })).rejects.toThrow(
                TypeError
            );
        });
    });
});
