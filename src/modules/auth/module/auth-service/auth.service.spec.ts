import { Test } from '@nestjs/testing';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import { getAuthFacadeMockHelper } from '~/modules/auth/helpers/classes/auth-facade-helper/mock';
import { AuthService } from '~/modules/auth/module/auth-service';
import { getMockByToken } from '~/shared/lib/get-mock-by-token.lib';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [AuthService],
    })
        .useMocker((token) => {
            if (token === AuthFacadeHelper) {
                return getAuthFacadeMockHelper();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
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

    describe('resetPassword', () => {
        it(`should return a "user" and "tokens"`, async () => {
            const { authService } = await getMocks();

            const { email, password, id, userName, displayName } = generateUser();
            const { refreshToken, accessToken } = generateTokens();

            const returnValue = {
                refreshToken,
                accessToken,
                user: {
                    email,
                    userName,
                    displayName,
                    id,
                },
            };

            const acceptValue = {
                email,
                id,
                password,
                confirmPassword: password,
            };

            expect(await authService.resetPassword(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('signup', () => {
        it('should return a "user", "tokens"', async () => {
            const { authService } = await getMocks();
            const { email, userName, displayName, password, id } = generateUser();
            const { refreshToken, accessToken } = generateTokens();

            const acceptValue = {
                email,
                userName,
                displayName,
                password,
                confirmPassword: password,
            };

            const returnValue = {
                refreshToken,
                accessToken,
                user: {
                    email,
                    userName,
                    displayName,
                    id,
                },
            };

            expect(await authService.signup(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('logout', () => {
        it('should return "void"', async () => {
            const { authService } = await getMocks();
            const { id } = generateUser();

            expect(await authService.logout({ id })).toBe(void 0);
        });
    });

    describe('login', () => {
        it('should return "access" and "refresh" tokens', async () => {
            const { authService } = await getMocks();
            const { email, id, password, userName, displayName } = generateUser();
            const { accessToken, refreshToken } = generateTokens();

            const acceptValue = {
                email,
                id,
                password,
            };

            const returnValue = {
                user: {
                    id,
                    email,
                    userName,
                    displayName,
                },
                accessToken,
                refreshToken,
            };

            expect(await authService.login(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('refresh', () => {
        it('should return "tokens"', async () => {
            const { authService } = await getMocks();

            const { email, id } = generateUser();
            const { refreshToken, accessToken } = generateTokens();

            const acceptValue = {
                email,
                id,
            };

            const returnValue = {
                accessToken,
                refreshToken,
            };

            expect(await authService.refresh(acceptValue)).toStrictEqual(returnValue);
        });
    });
});
