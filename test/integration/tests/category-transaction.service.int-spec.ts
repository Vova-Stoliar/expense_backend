import { Test } from '@nestjs/testing';
import { AppModule } from '~/app/app.module';
import { AuthService } from '~/modules/auth/module/auth-service';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { CategoryTransactionService } from '~/modules/category-transaction/module/category-transaction-service';
import type { DeleteTransaction } from '~/modules/category-transaction/types';
import { CategoryService } from '~/modules/category/module/category-service/category.service';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';
import { getCreatedUser } from '../constants';
import { getCategoryTransaction, getCreatedCategory } from '../lib';

describe('CategoryTransactionService', () => {
    let categoryService: CategoryService;
    let prismaService: PrismaService;
    let authService: AuthService;
    let categoryTransactionService: CategoryTransactionService;

    let categoryTransactionRepository: CategoryTransactionRepository;
    let userRepository: UserRepository;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        categoryService = moduleRef.get<CategoryService>(CategoryService);
        prismaService = moduleRef.get<PrismaService>(PrismaService);
        authService = moduleRef.get<AuthService>(AuthService);
        categoryTransactionService = moduleRef.get<CategoryTransactionService>(CategoryTransactionService);

        categoryTransactionRepository = moduleRef.get<CategoryTransactionRepository>(CategoryTransactionRepository);
        userRepository = moduleRef.get<UserRepository>(UserRepository);

        await prismaService.$transaction([categoryTransactionRepository.deleteMany(), userRepository.deleteMany()]);
    });

    afterEach(async () => {
        await prismaService.$transaction([categoryTransactionRepository.deleteMany(), userRepository.deleteMany()]);
    });

    afterAll(async () => {
        await prismaService.$disconnect();
    });

    it('should be defined', async () => {
        expect(categoryTransactionService).toBeDefined();
    });

    describe('create', () => {
        describe('when "category" exists', () => {
            it('should return "category transaction"', async () => {
                const user = await getCreatedUser({ authService });
                const createdCategory = await getCreatedCategory({ categoryService, user });

                const { amount, notes } = generateCategoryTransaction();

                const acceptValue = {
                    categoryId: createdCategory.id,
                    transactionToCreate: { amount, notes },
                    user: {
                        id: user.id,
                        categories: [createdCategory],
                    },
                };

                const expectedValue = {
                    id: expect.toBeUUID(),
                    amount,
                    notes,
                };

                expect(await categoryTransactionService.create(acceptValue)).toMatchObject(expectedValue);
            });
        });

        describe('when category does not exist', () => {
            it('should throw error', async () => {
                const user = await getCreatedUser({ authService });
                const createdCategory = await getCreatedCategory({ categoryService, user });

                const transactionToCreate = generateCategoryTransaction();

                const acceptValue = {
                    categoryId: createdCategory.id,
                    transactionToCreate: { amount: transactionToCreate.amount, notes: transactionToCreate.notes },
                    user: {
                        id: user.id,
                        categories: [],
                    },
                };

                await expect(categoryTransactionService.create(acceptValue)).rejects.toThrow();
            });
        });
    });

    describe('getAll', () => {
        it('should return all "transactions" by "category"', async () => {
            const user = await getCreatedUser({ authService });
            const createdCategory = await getCreatedCategory({ categoryService, user });

            const transactionToCreate = generateCategoryTransaction();

            const acceptValue = { categoryId: createdCategory.id, userId: user.id };

            const createdTransaction = await categoryTransactionService.create({
                categoryId: createdCategory.id,
                transactionToCreate: { amount: transactionToCreate.amount, notes: transactionToCreate.notes },
                user: {
                    id: user.id,
                    categories: [createdCategory],
                },
            });

            const expectedValue = {
                id: createdTransaction.id,
                amount: transactionToCreate.amount,
                notes: transactionToCreate.notes,
            };

            expect(await categoryTransactionService.getAll(acceptValue)).toEqual(
                expect.arrayContaining([expect.objectContaining(expectedValue)])
            );
        });
    });

    describe('delete', () => {
        describe('when category exists', () => {
            describe('and when transaction exists', () => {
                it('should not throw', async () => {
                    const user = await getCreatedUser({ authService });
                    const createdCategory = await getCreatedCategory({ categoryService, user });
                    const transaction = await getCategoryTransaction({
                        categoryTransactionService,
                        category: createdCategory,
                        userId: user.id,
                    });

                    const acceptValue: DeleteTransaction = {
                        transactionId: transaction.id,
                        categoryId: createdCategory.id,
                        user: {
                            id: user.id,
                            categories: [createdCategory],
                        },
                    };

                    await expect(categoryTransactionService.delete(acceptValue)).resolves.not.toThrow();
                });
            });
        });
    });

    describe('get', () => {
        it('should return transaction by id', async () => {
            const user = await getCreatedUser({ authService });
            const createdCategory = await getCreatedCategory({ categoryService, user });
            const transaction = await getCategoryTransaction({
                categoryTransactionService,
                category: createdCategory,
                userId: user.id,
            });

            const acceptValue = { categoryId: createdCategory.id, transactionId: transaction.id };

            const expectedValue = {
                id: transaction.id,
                amount: transaction.amount,
                notes: transaction.notes,
            };

            expect(await categoryTransactionService.get(acceptValue)).toMatchObject(expectedValue);
        });
    });

    describe('update', () => {
        it('should return transaction by id', async () => {
            const user = await getCreatedUser({ authService });
            const createdCategory = await getCreatedCategory({ categoryService, user });
            const transaction = await getCategoryTransaction({
                categoryTransactionService,
                category: createdCategory,
                userId: user.id,
            });

            const fieldsToUpdate = {
                notes: 'updated',
            };

            const expectedValue = {
                amount: transaction.amount,
                id: transaction.id,
                notes: fieldsToUpdate.notes,
            };

            const acceptValue = {
                transactionId: transaction.id,
                user: {
                    id: user.id,
                    categories: [createdCategory],
                },
                categoryId: createdCategory.id,
                fieldsToUpdate,
            };

            expect(await categoryTransactionService.update(acceptValue)).toMatchObject(expectedValue);
        });
    });
});
