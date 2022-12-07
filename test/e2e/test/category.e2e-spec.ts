import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '~/app/app.module';
import type { UserToSignupDto } from '~/modules/auth/dto';
import type { CreateCategoryDto } from '~/modules/category/dto';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';

const getUserToSignup = (user: Partial<UserToSignupDto> = {}): UserToSignupDto => {
    const { email, userName, displayName, password } = generateUser();

    return { email, userName, displayName, password, confirmPassword: password, ...user };
};

describe('Category (e2e)', () => {
    let app: INestApplication;
    let prismaService: PrismaService;
    let categoryTransactionRepository: CategoryTransactionRepository;
    let userRepository: UserRepository;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        prismaService = moduleFixture.get<PrismaService>(PrismaService);
        userRepository = moduleFixture.get<UserRepository>(UserRepository);
        categoryTransactionRepository = moduleFixture.get<CategoryTransactionRepository>(CategoryTransactionRepository);

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            })
        );

        await app.init();
    });

    beforeEach(async () => {
        await prismaService.$transaction([userRepository.deleteMany(), categoryTransactionRepository.deleteMany()]);
    });

    afterAll(async () => {
        await prismaService.$disconnect();
        await prismaService.$transaction([userRepository.deleteMany(), categoryTransactionRepository.deleteMany()]);

        await app.close();
    });

    describe('POST /categories', () => {
        const getCategoryToCreate = (category: Partial<CreateCategoryDto> = {}): CreateCategoryDto => {
            const { name, notes, amount } = generateCategory();

            return { name, notes, amount, ...category };
        };

        describe('when a user is not authorized', () => {
            it('should throw Unauthorized error', async () => {
                const response = await request(app.getHttpServer()).post('/categories').send(getCategoryToCreate());

                expect(response.status).toBe(401);
            });
        });

        describe('when user is authorized', () => {
            it('should create a category', async () => {
                const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const response = await request(app.getHttpServer())
                    .post('/categories')
                    .send(getCategoryToCreate({ name: 'New Category' }))
                    .auth(body.accessToken, { type: 'bearer' });

                expect(response.status).toBe(201);
            });

            describe('and when category already exists', () => {
                it('should throw BadRequest', async () => {
                    const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                    await request(app.getHttpServer())
                        .post('/categories')
                        .send(getCategoryToCreate({ name: 'New Category' }))
                        .auth(body.accessToken, { type: 'bearer' });

                    const response = await request(app.getHttpServer())
                        .post('/categories')
                        .send(getCategoryToCreate({ name: 'New Category' }))
                        .auth(body.accessToken, { type: 'bearer' });

                    expect(response.status).toBe(400);
                });
            });
        });
    });

    describe('POST /categories/default', () => {
        describe('when a user is not authorized', () => {
            it('should throw Unauthorized error', async () => {
                const response = await request(app.getHttpServer()).post('/categories/default').send();

                expect(response.status).toBe(401);
            });
        });

        describe('when a user is authorized', () => {
            describe('and when user is not admin', () => {
                it('should throw Forbidden error', async () => {
                    const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                    const response = await request(app.getHttpServer())
                        .post('/categories/default')
                        .send()
                        .auth(body.accessToken, { type: 'bearer' });

                    expect(response.status).toBe(403);
                });
            });
        });
    });

    describe('GET /categories', () => {
        describe('when a user is not authorized', () => {
            it('should throw Unauthorized error', async () => {
                const response = await request(app.getHttpServer()).get('/categories').send();

                expect(response.status).toBe(401);
            });
        });

        describe('when a user is authorized', () => {
            it('should return categories by a user', async () => {
                const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const response = await request(app.getHttpServer())
                    .get('/categories')
                    .auth(body.accessToken, { type: 'bearer' });

                expect(response.status).toBe(200);
            });
        });
    });

    describe('PATCH /categories:id', () => {
        describe('when a user is not authorized', () => {
            it('should throw Unauthorized error', async () => {
                const response = await request(app.getHttpServer())
                    .patch(`/categories/${generateCategory().id}`)
                    .send({ name: 'Updated' });

                expect(response.status).toBe(401);
            });
        });

        describe('when a user is authorized', () => {
            it('should update a category by id', async () => {
                const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const categories = await request(app.getHttpServer())
                    .get('/categories')
                    .auth(body.accessToken, { type: 'bearer' });

                const response = await request(app.getHttpServer())
                    .patch(`/categories/${categories.body[0].id}`)
                    .auth(body.accessToken, { type: 'bearer' })
                    .send({ name: 'Updated' });

                expect(response.status).toBe(200);
            });
        });
    });

    describe('DELETE /categories:id', () => {
        describe('when a user is not authorized', () => {
            it('should throw Unauthorized error', async () => {
                const response = await request(app.getHttpServer()).delete(`/categories/${generateCategory().id}`);

                expect(response.status).toBe(401);
            });
        });

        describe('when a user is authorized', () => {
            it('should delete a category by id', async () => {
                const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const categories = await request(app.getHttpServer())
                    .get('/categories')
                    .auth(body.accessToken, { type: 'bearer' });

                const response = await request(app.getHttpServer())
                    .delete(`/categories/${categories.body[0].id}`)
                    .auth(body.accessToken, { type: 'bearer' });

                expect(response.status).toBe(200);
            });
        });
    });
});
