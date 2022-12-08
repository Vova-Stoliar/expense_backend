import { Test } from '@nestjs/testing';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { getPrismaServiceMock } from '~/shared/modules/prisma/module/mock';
import { TransactionHelper } from './transaction.helper';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { PrismaService } from '~/shared/modules/prisma';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TransactionHelper],
    })
        .useMocker((token) => {
            if (token === PrismaService) return getPrismaServiceMock();

            if (typeof token === 'function') return getMockByToken(token);
        })
        .compile();

    const transactionHelper = moduleRef.get<TransactionHelper>(TransactionHelper);

    return { transactionHelper };
};

describe('TransactionHelper', () => {
    it('should be defined', async () => {
        const { transactionHelper } = await getMocks();

        expect(transactionHelper).toBeDefined();
    });

    describe('createTransaction', () => {
        it('should not throw', async () => {
            const { transactionHelper } = await getMocks();

            const { amount, notes, id, createdAt } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { categories, id: userId } = generateUser();

            const user = { id: userId, categories };

            const transactionToCreate = {
                amount,
                notes,
                id,
                createdAt: createdAt.toISOString(),
                updatedAt: createdAt.toISOString(),
            };

            await expect(
                transactionHelper.createTransaction({ transactionToCreate, user, categoryId })
            ).resolves.not.toThrow();
        });
    });

    describe('deleteTransaction', () => {
        it('should not throw', async () => {
            const { transactionHelper } = await getMocks();

            const { id: transactionId } = generateCategoryTransaction();
            const { id: userId, categories } = generateUser();

            const acceptValue = {
                transaction: {
                    id: transactionId,
                },
                userId,
                categories,
            };

            await expect(transactionHelper.deleteTransaction(acceptValue)).resolves.not.toThrow();
        });
    });

    describe('updateTransaction', () => {
        it('should not throw', async () => {
            const { transactionHelper } = await getMocks();

            const transaction = generateCategoryTransaction();
            const user = generateUser();

            const transactionToUpdate = {
                amount: transaction.amount,
                notes: transaction.notes,
                id: transaction.id,
                updatedAt: transaction.updatedAt.toISOString(),
                createdAt: transaction.createdAt,
            };

            const acceptValue = {
                userId: user.id,
                transaction: transactionToUpdate,
                categories: user.categories,
            };

            await expect(transactionHelper.updateTransaction(acceptValue)).resolves.not.toThrow();
        });
    });
});
