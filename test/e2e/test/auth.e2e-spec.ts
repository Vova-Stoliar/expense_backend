import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '~/app/app.module';
import type { UserToLoginDto, UserToResetPasswordDto } from '~/modules/auth/dto';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';
import type { PartialExcept } from '~/shared/types';
import { getUserToSignup } from '../constants';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let prismaService: PrismaService;
    let userRepository: UserRepository;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        prismaService = moduleFixture.get<PrismaService>(PrismaService);
        userRepository = moduleFixture.get<UserRepository>(UserRepository);

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            })
        );

        await app.init();
    });

    beforeEach(async () => {
        await prismaService.$transaction([userRepository.deleteMany()]);
    });

    afterAll(async () => {
        await prismaService.$disconnect();
        await prismaService.$transaction([userRepository.deleteMany()]);

        await app.close();
    });

    describe('POST /signup', () => {
        describe('when all fields are valid', () => {
            it('should signup a user', async () => {
                const response = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                expect(response.status).toBe(201);
            });
        });

        describe('when email is not valid', () => {
            it('should throw BadRequest', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/signup')
                    .send(getUserToSignup({ email: 'wrong email' }));

                expect(response.status).toBe(400);
            });
        });

        describe('when a user by email already exists', () => {
            it('should throw BadRequest', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/signup')
                    .send(getUserToSignup({ email: 'wrong email' }));

                expect(response.status).toBe(400);
            });
        });

        describe('when password does not match confirm password', () => {
            it('should throw BadRequest', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/signup')
                    .send(getUserToSignup({ email: 'wrong email' }));

                expect(response.status).toBe(400);
            });
        });

        describe('when one of the fields does not exist', () => {
            it('should throw BadRequest', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/signup')
                    .send(getUserToSignup({ email: undefined }));

                expect(response.status).toBe(400);
            });
        });
    });

    describe('POST /login', () => {
        const getUserToLogin = (user: Partial<UserToLoginDto> = {}): UserToLoginDto => {
            const { email, password } = getUserToSignup(user);

            return { email, password, ...user };
        };

        describe('when fields are valid', () => {
            it('should login a user', async () => {
                await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const response = await request(app.getHttpServer()).post('/auth/login').send(getUserToLogin());

                expect(response.status).toBe(200);
            });
        });

        describe('when email is not valid', () => {
            it('should login a user', async () => {
                await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send(getUserToLogin({ email: 'wrong email' }));

                expect(response.status).toBe(400);
            });
        });

        describe('when a password by user is not correct', () => {
            it('should throw BadRequest', async () => {
                await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send(getUserToLogin({ password: 'wrong password' }));

                expect(response.status).toBe(400);
            });
        });

        describe('when a user by email does not exist', () => {
            it('should throw BadRequest', async () => {
                const response = await request(app.getHttpServer()).post('/auth/login').send(getUserToLogin());

                expect(response.status).toBe(400);
            });
        });
    });

    describe('POST /resetPassword', () => {
        const getUserToResetPassword = (user: PartialExcept<UserToResetPasswordDto, 'id'>): UserToResetPasswordDto => {
            const { email, password, confirmPassword } = getUserToSignup();

            return {
                email,
                password,
                confirmPassword,
                ...user,
            };
        };

        describe('when a user in not authorized', () => {
            it('should throw Unauthorized error', async () => {
                const response = await request(app.getHttpServer()).post('/auth/resetPassword');

                expect(response.status).toBe(401);
            });
        });

        describe('when a user is authorized', () => {
            it('should reset password', async () => {
                const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());
                const { user } = body;

                const response = await request(app.getHttpServer())
                    .post('/auth/resetPassword')
                    .send(getUserToResetPassword({ id: user.id }))
                    .auth(body.accessToken, { type: 'bearer' });

                expect(response.status).toBe(200);
            });
        });
    });

    describe('GET /logout', () => {
        describe('when a user in not authorized', () => {
            it('should throw Unauthorized error', async () => {
                const response = await request(app.getHttpServer()).get('/auth/logout');

                expect(response.status).toBe(401);
            });
        });

        describe('when a user in authorized', () => {
            it('should logout user', async () => {
                const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const response = await request(app.getHttpServer())
                    .get('/auth/logout')
                    .auth(body.accessToken, { type: 'bearer' });

                expect(response.status).toBe(204);
            });
        });
    });

    describe('GET /refresh', () => {
        describe('when a user is not authorized', () => {
            it('should throw Unauthorized error', async () => {
                const response = await request(app.getHttpServer()).get('/auth/refresh');

                expect(response.status).toBe(401);
            });
        });

        describe('when a user is authorized', () => {
            it('should refresh auth tokens', async () => {
                const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const response = await request(app.getHttpServer())
                    .get('/auth/refresh')
                    .auth(body.refreshToken, { type: 'bearer' });

                expect(response.status).toBe(200);
            });
        });
    });
});
