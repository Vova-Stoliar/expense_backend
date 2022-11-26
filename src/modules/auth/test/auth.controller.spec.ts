import { Test } from '@nestjs/testing';
import type { User } from '@prisma/client';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { AuthController } from '~/modules/auth/module/auth.controller';
import { AuthService } from '~/modules/auth/module/auth.service';
import { getAuthServiceMock } from '~/modules/auth/test/mocks';
import { getLoginReturnValue, getSignupReturnValue, getTokens, getUser } from '~/modules/auth/test/stubs';
import type { IUserUserToSignupDto, IUserToLoginDto } from '~/modules/auth/types';
import type { BaseUser } from '~/shared/types';

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [AuthController],
    })
        .useMocker((token) => {
            if (token === AuthService) {
                return getAuthServiceMock();
            }

            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
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

            const userToSignup: IUserUserToSignupDto = {
                email: getUser().email,
                userName: getUser().userName,
                displayName: getUser().displayName,
                password: getUser().password,
                confirmPassword: getUser().password,
            };

            expect(await authController.signup(userToSignup)).toStrictEqual(getSignupReturnValue());
        });
    });

    describe('logout', () => {
        it('should return "void"', async () => {
            const { authController } = await getMocks();

            expect(await authController.logout(getUser().id)).toBe(void 0);
        });
    });

    describe('login', () => {
        it('should return a "user" and "tokens"', async () => {
            const { authController } = await getMocks();

            const userToLogin: IUserToLoginDto = {
                email: getUser().email,
                id: getUser().id,
                password: getUser().password,
            };

            expect(await authController.login(userToLogin)).toStrictEqual(getLoginReturnValue());
        });
    });

    describe('refresh', () => {
        it('should return "tokens"', async () => {
            const { authController } = await getMocks();

            const user: BaseUser & { hashedRefreshToken: NonNullable<User['hashedRefreshToken']> } = {
                email: getUser().email,
                id: getUser().id,
                hashedRefreshToken: getUser().id,
                userName: getUser().userName,
                displayName: getUser().displayName,
            };

            expect(await authController.refresh(user, getUser().hashedRefreshToken)).toStrictEqual(getTokens());
        });
    });
});
