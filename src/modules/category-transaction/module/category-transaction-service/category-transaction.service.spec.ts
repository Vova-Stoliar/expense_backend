import { Test } from '@nestjs/testing';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
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

    return { categoryTransactionService };
};

describe('CategoryTransactionService', () => {
    it('should be defined', async () => {
        const { categoryTransactionService } = await getMocks();

        expect(categoryTransactionService).toBeDefined();
    });

    describe('create', () => {
        it('should return "category transaction"', async () => {
            const { categoryTransactionService } = await getMocks();

            const { amount, notes, id } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();

            const user = { id: generateUser().id, categories: generateUser().categories };
            const transactionToCreate = { amount, notes };
            const returnValue = { amount, notes, id };

            expect(await categoryTransactionService.create({ categoryId, transactionToCreate, user })).toEqual(
                returnValue
            );
        });
    });

    describe('getAll', () => {
        it('should return all "transactions" by "category"', async () => {
            const { categoryTransactionService } = await getMocks();

            const { amount, notes, id } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { id: userId } = generateUser();

            const returnValue = { amount, notes, id };

            expect(await categoryTransactionService.getAll({ userId, categoryId })).toEqual([returnValue]);
        });
    });
});
