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

            const { amount, notes, id } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();

            const user = { id: generateUser().id, categories: generateUser().categories };
            const createTransactionDto = { amount, notes };
            const returnValue = { amount, notes, id };

            expect(await categoryTransactionController.create(createTransactionDto, categoryId, user)).toEqual(
                returnValue
            );
        });
    });

    describe('getAll', () => {
        it('should return all "transactions" by "category"', async () => {
            const { categoryTransactionController } = await getMocks();

            const { amount, notes, id } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { id: userId } = generateUser();

            const returnValue = { amount, notes, id };

            expect(await categoryTransactionController.getAll(userId, categoryId)).toEqual([returnValue]);
        });
    });
});
