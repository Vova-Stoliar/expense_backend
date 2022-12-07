import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '~/app/app.module';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { generateCategory } from '~/shared/constants/test';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';
import { getUserToSignup } from '../constants';

const getTransacionToCreate = () => {
    const { amount, notes } = generateCategoryTransaction();

    return { amount, notes };
};

describe('CategoryTransaction (e2e)', () => {
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

    describe('POST /categories/transaction/:categoryId', () => {
        describe('when user is authorized', () => {
            describe('and when "category" exists', () => {
                it('should return "category transaction"', async () => {
                    const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                    const categories = await request(app.getHttpServer())
                        .get('/categories')
                        .auth(body.accessToken, { type: 'bearer' });

                    const response = await request(app.getHttpServer())
                        .post(`/categories/transaction/${categories.body[0].id}`)
                        .auth(body.accessToken, { type: 'bearer' })
                        .send(getTransacionToCreate());

                    expect(response.status).toBe(201);
                });
            });

            describe('when category does not exist', () => {
                it('should throw BadRequest', async () => {
                    const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                    const response = await request(app.getHttpServer())
                        .post(`/categories/transaction/${generateCategory().id}`)
                        .auth(body.accessToken, { type: 'bearer' });

                    expect(response.status).toBe(400);
                });
            });
        });

        describe('when user is not authorized', () => {
            it('should throw Unauthorized', async () => {
                const response = await request(app.getHttpServer()).post(
                    `/categories/transaction/${generateCategory().id}`
                );

                expect(response.status).toBe(401);
            });
        });
    });

    describe('GET /categories/transaction/:categoryId', () => {
        describe('when user is not authorized', () => {
            it('should throw Unauthorized', async () => {
                const response = await request(app.getHttpServer()).get(
                    `/categories/transaction/${generateCategory().id}`
                );

                expect(response.status).toBe(401);
            });
        });

        describe('when user is authorized', () => {
            it('should return all "transactions" by "category"', async () => {
                const { body } = await request(app.getHttpServer()).post('/auth/signup').send(getUserToSignup());

                const categories = await request(app.getHttpServer())
                    .get('/categories')
                    .auth(body.accessToken, { type: 'bearer' });

                await request(app.getHttpServer())
                    .post(`/categories/transaction/${categories.body[0].id}`)
                    .send(getTransacionToCreate())
                    .auth(body.accessToken, { type: 'bearer' });

                const response = await request(app.getHttpServer())
                    .get(`/categories/transaction/${categories.body[0].id}`)
                    .auth(body.accessToken, { type: 'bearer' });

                expect(response.status).toBe(200);
            });
        });
    });
});
