import { Test } from '@nestjs/testing';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import * as __shared_lib from '~/shared/lib';
import { TransactionFacadeHelper } from '../../helpers/classes/transaction-facade-helper';
import { getTransactionFacadeHelperMock } from '../../helpers/classes/transaction-facade-helper/mock';
import { CategoryTransactionService } from './category-transaction.service';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CategoryTransactionService],
    })
        .useMocker((token) => {
            if (token === TransactionFacadeHelper) {
                return getTransactionFacadeHelperMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const categoryTransactionService = moduleRef.get<CategoryTransactionService>(CategoryTransactionService);
    const validateIsValueDefined = jest.spyOn(__shared_lib, 'validateIsValueDefined');

    return { categoryTransactionService, validateIsValueDefined };
};

describe('CategoryTransactionService', () => {
    it('should be defined', async () => {
        const { categoryTransactionService } = await getMocks();

        expect(categoryTransactionService).toBeDefined();
    });

    describe('create', () => {
        it('should return "created category transaction"', async () => {
            const { categoryTransactionService } = await getMocks();

            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { categories, id: userId } = generateUser();

            const user = { id: userId, categories };
            const transactionToCreate = { amount, notes };
            const returnValue = { amount, notes, id, updatedAt, createdAt };

            expect(await categoryTransactionService.create({ transactionToCreate, categoryId, user })).toEqual(
                returnValue
            );
        });
    });

    describe('getAll', () => {
        it('should return all "transactions" by "category"', async () => {
            const { categoryTransactionService } = await getMocks();

            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { id: userId } = generateUser();

            const expectedValue = { amount, notes, id, updatedAt, createdAt };

            expect(await categoryTransactionService.getAll({ userId, categoryId })).toEqual([expectedValue]);
        });
    });

    describe('delete', () => {
        describe('when category exists', () => {
            describe('and when transaction exists', () => {
                it('should not throw', async () => {
                    const { categoryTransactionService } = await getMocks();

                    const { id: transactionId } = generateCategoryTransaction();
                    const { id: categoryId } = generateCategory();
                    const { id: userId, categories } = generateUser();

                    const acceptValue = {
                        transactionId,
                        categoryId,
                        user: {
                            id: userId,
                            categories,
                        },
                    };

                    await expect(categoryTransactionService.delete(acceptValue)).resolves.not.toThrow();
                });
            });
        });
    });

    describe('get', () => {
        it('should return transaction by id', async () => {
            const { categoryTransactionService } = await getMocks();

            const { id: transactionId } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();

            const expectedValue = { amount, notes, id, updatedAt, createdAt };

            expect(await categoryTransactionService.get({ categoryId, transactionId })).toEqual(expectedValue);
        });
    });

    describe('update', () => {
        it('should return transaction by id', async () => {
            const { categoryTransactionService } = await getMocks();

            const { id: transactionId } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { categories, id: userId } = generateUser();
            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();

            const fieldsToUpdate = {
                notes: 'updated',
            };

            const user = {
                id: userId,
                categories,
            };

            const acceptValue = { categoryId, transactionId, fieldsToUpdate, user };
            const expectedValue = { amount, notes, id, updatedAt, createdAt };

            expect(await categoryTransactionService.update(acceptValue)).toEqual(expectedValue);
        });
    });
});
