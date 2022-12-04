import { Test } from '@nestjs/testing';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { TransactionFacadeHelper } from './transaction-facade.helper';

const getCategoryTransactionRepositoryMock = () => {
    const { amount, notes, id } = generateCategoryTransaction();

    const categoryTransaction = { amount, notes, id };

    return {
        findMany: jest.fn().mockResolvedValue([categoryTransaction]),
    };
};

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TransactionFacadeHelper],
    })
        .useMocker((token) => {
            if (token === CategoryTransactionRepository) {
                return getCategoryTransactionRepositoryMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const transactionFacadeHelper = moduleRef.get<TransactionFacadeHelper>(TransactionFacadeHelper);

    return { transactionFacadeHelper };
};

describe('TransactionFacadeHelper', () => {
    it('should be defined', async () => {
        const { transactionFacadeHelper } = await getMocks();

        expect(transactionFacadeHelper).toBeDefined();
    });

    describe('create', () => {
        it('should return "created category transaction"', async () => {
            const { transactionFacadeHelper } = await getMocks();

            const { amount, notes, id } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();

            const user = { id: generateUser().id, categories: generateUser().categories };
            const transactionToCreate = { amount, notes, id };
            const returnValue = { amount, notes, id };

            expect(await transactionFacadeHelper.createTransaction({ transactionToCreate, categoryId, user })).toEqual(
                returnValue
            );
        });
    });

    describe('getAll', () => {
        it('should return all "transactions" by "category"', async () => {
            const { transactionFacadeHelper } = await getMocks();

            const { amount, notes, id } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { id: userId } = generateUser();

            const returnValue = { amount, notes, id };

            expect(await transactionFacadeHelper.getAll({ userId, categoryId })).toEqual([returnValue]);
        });
    });
});
