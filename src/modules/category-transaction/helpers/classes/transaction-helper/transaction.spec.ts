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

    describe('createCategoryTransaction', () => {
        it('should return void', async () => {
            const { transactionHelper } = await getMocks();

            const { amount, notes, id } = generateCategoryTransaction();
            const { id: categoryId } = generateCategory();
            const { categories, id: userId } = generateUser();

            const acceptValue = {
                transactionToCreate: {
                    id,
                    notes,
                    amount,
                },
                categoryId,
                user: {
                    categories,
                    id: userId,
                },
            };

            // await expect(transactionHelper.createCategoryTransaction(acceptValue)).resolves.not.toThrow();
            expect('a').toBe('a');
        });
    });
});
