import { Test } from '@nestjs/testing';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import type { BaseUser, Tokens } from '~/shared/types';
import * as libs from './lib';
import { AuthController } from '~/modules/auth/module/auth-controller';
import { AuthService } from '~/modules/auth/module/auth-service';
import { getAuthServiceMock } from '~/modules/auth/module/auth-service/mock';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [AuthController],
    })
        .useMocker((token) => {
            if (token === AuthService) {
                return getAuthServiceMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const authController = moduleRef.get<AuthController>(AuthController);
    const authService = moduleRef.get<AuthService>(AuthService);

    return { authController, authService };
};

describe('CatsController', () => {
    it('should be defined', async () => {
        const { authController } = await getMocks();

        expect(authController).toBeDefined();
    });

    describe('signup', () => {
        it('should return a "user", "refresh" and "access tokens"', async () => {
            const { authController } = await getMocks();
            const { email, userName, displayName, password, id } = generateUser();
            const { refreshToken, accessToken } = generateTokens();

            const acceptValue = {
                email,
                userName,
                displayName,
                password,
                confirmPassword: password,
            };

            const returnValue: { user: BaseUser } & Tokens = {
                refreshToken,
                accessToken,
                user: {
                    email,
                    userName,
                    displayName,
                    id,
                },
            };

            expect(await authController.signup(acceptValue)).toStrictEqual(returnValue);
        });
    });
    //
    // describe('logout', () => {
    //     const { getLogoutAcceptValue } = libs.generateLogoutLibs();
    //
    //     it('should return "void"', async () => {
    //         const { authController } = await libs.getMocks();
    //
    //         const { acceptValue } = getLogoutAcceptValue();
    //
    //         expect(await authController.logout(acceptValue)).toBe(void 0);
    //     });
    // });
    //
    // describe('login', () => {
    //     const { getLoginReturnValue, getLoginAcceptValue } = libs.generateLoginLibs();
    //
    //     it('should return a "user" and "tokens"', async () => {
    //         const { authController } = await libs.getMocks();
    //
    //         const { returnValue } = getLoginReturnValue();
    //         const { acceptValue } = getLoginAcceptValue();
    //
    //         expect(await authController.login(acceptValue)).toStrictEqual(returnValue);
    //     });
    // });
    //
    // describe('refresh', () => {
    //     const { getRefreshReturnValue, getRefreshAcceptValue } = libs.generateRefreshLibs();
    //
    //     it('should return "tokens"', async () => {
    //         const { authController } = await libs.getMocks();
    //
    //         const { acceptValue } = getRefreshAcceptValue();
    //         const { returnValue } = getRefreshReturnValue();
    //
    //         expect
    //         (await authController.refresh(acceptValue.user, acceptValue.refreshToken)).toStrictEqual(returnValue);
    //     });
    // });
    //
    // describe('resetPassword', () => {
    //     const { getAcceptValue, getReturnValue } = libs.resetPassword();
    //
    //     it('should return a "user" and "tokens"', async () => {
    //         const { authController } = await libs.getMocks();
    //
    //         const { returnValue } = getReturnValue();
    //         const { acceptValue } = getAcceptValue();
    //
    //         expect(await authController.resetPassword(acceptValue)).toStrictEqual(returnValue);
    //     });
    // });
});
