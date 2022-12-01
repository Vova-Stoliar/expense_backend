import { Test } from '@nestjs/testing';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import { AuthController } from '~/modules/auth/module/auth-controller';
import { AuthService } from '~/modules/auth/module/auth-service';
import { getAuthServiceMock } from '~/modules/auth/module/auth-service/mock';
import { getMockByToken } from '~/shared/lib/get-mock-by-token.lib';

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

            expect(await authController.signup(acceptValue)).toEqual(returnValue);
        });
    });

    describe('logout', () => {
        it('should return "void"', async () => {
            const { authController } = await getMocks();
            const { id } = generateUser();

            expect(await authController.logout(id)).toBe(void 0);
        });
    });

    describe('login', () => {
        it('should return a "user" and "tokens"', async () => {
            const { authController } = await getMocks();
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

            expect(await authController.login(acceptValue)).toEqual(returnValue);
        });
    });

    describe('refresh', () => {
        it('should return "tokens"', async () => {
            const { authController } = await getMocks();

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

            expect(await authController.refresh(acceptValue)).toEqual(returnValue);
        });
    });

    describe('resetPassword', () => {
        it('should return a "user" and "tokens"', async () => {
            const { authController } = await getMocks();

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

            expect(await authController.resetPassword(acceptValue)).toEqual(returnValue);
        });
    });
});
