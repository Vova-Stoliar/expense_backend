import { Test } from '@nestjs/testing';
import type { User } from '@prisma/client';
import { AppModule } from '~/app/app.module';
import { AuthService } from '~/modules/auth/module/auth-service';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { CategoryTransactionService } from '~/modules/category-transaction/module/transaction-service';
import { CategoryService } from '~/modules/category/module/category-service/category.service';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';
import { getCategoryToCrate, getCreatedUser } from '../constants';

async function getCreatedCategory(params: { categoryService: CategoryService; user: Pick<User, 'id'> }) {
    const categoryToCreate = getCategoryToCrate();
    const { categoryService, user } = params;

    return categoryService.create({
        categoryToCreate,
        user: { id: user.id, categories: [] },
    });
}

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

                const transactionToCreate = generateCategoryTransaction();

                const acceptValue = {
                    categoryId: createdCategory.id,
                    transactionToCreate: { amount: transactionToCreate.amount, notes: transactionToCreate.notes },
                    user: {
                        id: user.id,
                        categories: [createdCategory],
                    },
                };

                const expectedValue = {
                    id: expect.toBeUUID(),
                    amount: transactionToCreate.amount,
                    notes: transactionToCreate.notes,
                };

                expect(await categoryTransactionService.create(acceptValue)).toEqual(expectedValue);
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
});
