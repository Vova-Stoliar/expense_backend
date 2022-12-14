import { Test } from '@nestjs/testing';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { TransactionFacadeHelper } from './transaction-facade.helper';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TransactionFacadeHelper],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const transactionFacadeHelper = moduleRef.get<TransactionFacadeHelper>(TransactionFacadeHelper);
    const categoryTransactionRepository = moduleRef.get<CategoryTransactionRepository>(CategoryTransactionRepository);

    return { transactionFacadeHelper, categoryTransactionRepository };
};

describe('TransactionFacadeHelper', () => {
    it('should be defined', async () => {
        const { transactionFacadeHelper } = await getMocks();

        expect(transactionFacadeHelper).toBeDefined();
    });

    describe('createTransaction', () => {
        it('should return "created category transaction"', async () => {
            const { transactionFacadeHelper } = await getMocks();

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

            expect(await transactionFacadeHelper.createTransaction({ transactionToCreate, user, categoryId })).toEqual(
                transactionToCreate
            );
        });
    });

    describe('validateTransaction', () => {
        describe('when transaction by category exits', () => {
            it('should return all "transactions" by "category"', async () => {
                const { transactionFacadeHelper, categoryTransactionRepository } = await getMocks();

                const { amount, notes, id, createdAt, updatedAt } = generateCategoryTransaction();
                const { id: categoryId } = generateCategory();

                const expectedValue = { amount, notes, id, createdAt, updatedAt };

                jest.spyOn(categoryTransactionRepository, 'findFirstOrThrow').mockResolvedValue(expectedValue);

                expect(await transactionFacadeHelper.validateTransaction({ id, categoryId })).toEqual(expectedValue);
            });
        });

        describe('when transaction by category does not exit', () => {
            it('should throw error', async () => {
                const { transactionFacadeHelper, categoryTransactionRepository } = await getMocks();

                const { id } = generateCategoryTransaction();
                const { id: categoryId } = generateCategory();

                jest.spyOn(categoryTransactionRepository, 'findFirstOrThrow').mockImplementation(() => {
                    throw new TypeError();
                });

                await expect(transactionFacadeHelper.validateTransaction({ id, categoryId })).rejects.toThrow(
                    TypeError
                );
            });
        });
    });

    describe('deleteTransaction', () => {
        it('should not throw', async () => {
            const { transactionFacadeHelper } = await getMocks();

            const { id: transactionId } = generateCategoryTransaction();
            const { id: userId, categories } = generateUser();

            const acceptValue = {
                transaction: {
                    id: transactionId,
                },
                userId,
                categories,
            };

            await expect(transactionFacadeHelper.deleteTransaction(acceptValue)).resolves.not.toThrow();
        });
    });

    describe('getAllTransactions', () => {
        it('should return transaction by id', async () => {
            const { transactionFacadeHelper, categoryTransactionRepository } = await getMocks();

            const { id: categoryId } = generateCategory();
            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();
            const { id: userId } = generateUser();

            const expectedValue = [{ amount, notes, id, updatedAt, createdAt }];

            jest.spyOn(categoryTransactionRepository, 'findMany').mockResolvedValue(expectedValue);

            expect(await transactionFacadeHelper.getAllTransactions({ userId, categoryId })).toEqual(expectedValue);
        });
    });

    describe('updateTransaction', () => {
        it('should return transaction by id', async () => {
            const { transactionFacadeHelper } = await getMocks();

            const transaction = generateCategoryTransaction();
            const user = generateUser();
            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();

            const expectedValue = { amount, notes, id, updatedAt: updatedAt.toISOString(), createdAt };

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

            expect(await transactionFacadeHelper.updateTransaction(acceptValue)).toEqual(expectedValue);
        });
    });
});
