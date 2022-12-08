import { Test } from '@nestjs/testing';
import { AppModule } from '~/app/app.module';
import { generateTokens } from '~/modules/auth/constants/test';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import { AuthService } from '~/modules/auth/module/auth-service/auth.service';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';
import { getUserToSignup } from '../constants';

describe('AuthService', () => {
    let prismaService: PrismaService;
    let authService: AuthService;
    let userRepository: UserRepository;
    let authFacadeHelper: AuthFacadeHelper;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        authService = moduleRef.get<AuthService>(AuthService);
        authFacadeHelper = moduleRef.get<AuthFacadeHelper>(AuthFacadeHelper);
        userRepository = moduleRef.get<UserRepository>(UserRepository);

        await prismaService.$transaction([userRepository.deleteMany()]);
    });

    beforeEach(() => {
        const { refreshToken, accessToken } = generateTokens();
        const createdAt = new Date().toISOString();

        jest.spyOn(authFacadeHelper, 'getTokens').mockResolvedValue({
            accessToken,
            refreshToken,
            createdAt: new Date(createdAt),
        });
    });

    afterEach(async () => {
        await prismaService.$transaction([userRepository.deleteMany()]);
    });

    afterAll(async () => {
        await prismaService.$disconnect();
    });

    it('should be defined', async () => {
        expect(authService).toBeDefined();
    });

    describe('resetPassword', () => {
        it('should return a "user" and "tokens"', async () => {
            const { email, password, confirmPassword, userName, displayName } = getUserToSignup();
            const { refreshToken, accessToken } = generateTokens();

            const { user } = await authService.signup(getUserToSignup());

            const acceptValue = {
                id: user.id,
                password,
                confirmPassword,
                email,
            };

            const returnValue = {
                accessToken,
                refreshToken,
                user: {
                    id: expect.toBeUUID(),
                    email,
                    userName,
                    displayName,
                },
            };

            expect(await authService.resetPassword(acceptValue)).toMatchObject(returnValue);
        });
    });

    describe('signup', () => {
        describe('when "email" does not exist in database', () => {
            it('should return a "user" and "tokens"', async () => {
                const { email, userName, displayName } = getUserToSignup();
                const { refreshToken, accessToken } = generateTokens();

                const returnValue = {
                    accessToken,
                    refreshToken,
                    user: {
                        id: expect.toBeUUID(),
                        email,
                        userName,
                        displayName,
                    },
                };

                expect(await authService.signup(getUserToSignup())).toMatchObject(returnValue);
            });
        });

        describe('when "email" exists in database', () => {
            it('should throw error', async () => {
                const userToCreate = getUserToSignup();

                await authService.signup(userToCreate);

                await expect(authService.signup(userToCreate)).rejects.toThrow();
            });
        });
    });

    describe('logout', () => {
        it('should return "void"', async () => {
            const { user } = await authService.signup(getUserToSignup());

            await expect(authService.logout({ id: user.id })).resolves.not.toThrow();
        });
    });

    describe('login', () => {
        describe('when "password" is correct', () => {
            it('should return a "user" and "tokens"', async () => {
                const { email, userName, displayName, password } = getUserToSignup();

                const { refreshToken, accessToken } = generateTokens();

                const returnValue = {
                    accessToken,
                    refreshToken,
                    user: {
                        id: expect.toBeUUID(),
                        email,
                        userName,
                        displayName,
                    },
                };

                await authService.signup(getUserToSignup());

                expect(await authService.login({ email, password })).toEqual(returnValue);
            });
        });

        describe('when "password" is not correct', () => {
            it('should throw error', async () => {
                const { email } = getUserToSignup();

                await authService.signup(getUserToSignup());

                await expect(authService.login({ email, password: 'wrong password' })).rejects.toThrow();
            });
        });
    });

    describe('refresh', () => {
        it('should return "tokens"', async () => {
            const { email } = getUserToSignup();
            const { refreshToken, accessToken } = generateTokens();

            const { user } = await authService.signup(getUserToSignup());

            expect(await authService.refresh({ email, id: user.id })).toEqual({ refreshToken, accessToken });
        });
    });
});
