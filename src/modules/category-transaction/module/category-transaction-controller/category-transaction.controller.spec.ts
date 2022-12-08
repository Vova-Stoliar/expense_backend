import { Test } from '@nestjs/testing';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { CategoryTransactionService } from '~/modules/category-transaction/module/category-transaction-service';
import { getCategoryTransactionServiceMock } from '../category-transaction-service/mock';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { CategoryTransactionController } from './category-transaction.controller';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CategoryTransactionController],
    })
        .useMocker((token) => {
            if (token === CategoryTransactionService) {
                return getCategoryTransactionServiceMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const categoryTransactionController = moduleRef.get<CategoryTransactionController>(CategoryTransactionController);

    return { categoryTransactionController };
};

describe('CategoryTransactionController', () => {
    it('should be defined', async () => {
        const { categoryTransactionController } = await getMocks();

        expect(categoryTransactionController).toBeDefined();
    });

    describe('create', () => {
        it('should return "created category transaction"', async () => {
            const { categoryTransactionController } = await getMocks();

            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { categories, id: userId } = generateUser();

            const user = { id: userId, categories };
            const createTransactionDto = { amount, notes };
            const returnValue = { amount, notes, id, updatedAt, createdAt };

            expect(await categoryTransactionController.create(createTransactionDto, categoryId, user)).toEqual(
                returnValue
            );
        });
    });

    describe('getAll', () => {
        it('should return all "transactions" by "category"', async () => {
            const { categoryTransactionController } = await getMocks();

            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { id: userId } = generateUser();

            const expectedValue = { amount, notes, id, updatedAt, createdAt };

            expect(await categoryTransactionController.getAll(userId, categoryId)).toEqual([expectedValue]);
        });
    });

    describe('delete', () => {
        it('should not throw', async () => {
            const { categoryTransactionController } = await getMocks();

            const { id: transactionId } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { id: userId, categories } = generateUser();

            await expect(
                categoryTransactionController.delete(categoryId, transactionId, { categories, id: userId })
            ).resolves.not.toThrow();
        });
    });

    describe('get', () => {
        it('should return transaction by id', async () => {
            const { categoryTransactionController } = await getMocks();

            const { id: transactionId } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();

            const expectedValue = { amount, notes, id, updatedAt, createdAt };

            expect(await categoryTransactionController.get(categoryId, transactionId)).toEqual(expectedValue);
        });
    });

    describe('update', () => {
        it('should return transaction by id', async () => {
            const { categoryTransactionController } = await getMocks();

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

            const expectedValue = { amount, notes, id, updatedAt, createdAt };

            expect(await categoryTransactionController.update(categoryId, transactionId, fieldsToUpdate, user)).toEqual(
                expectedValue
            );
        });
    });
});
