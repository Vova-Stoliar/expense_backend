import { Test } from '@nestjs/testing';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { PrismaService } from '~/shared/modules/prisma';
import { getPrismaServiceMock } from '~/shared/modules/prisma/module/mock';
import { TransactionHelper } from './transaction.helper';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TransactionHelper],
    })
        .useMocker((token) => {
            if (token === PrismaService) return getPrismaServiceMock();

            if (typeof token === 'function') return getMockByToken(token);
        })
        .compile();

    const categoryTransactionHelper = moduleRef.get<TransactionHelper>(TransactionHelper);

    return { categoryTransactionHelper };
};

describe('TransactionHelper', () => {
    it('should be defined', async () => {
        const { categoryTransactionHelper } = await getMocks();

        expect(categoryTransactionHelper).toBeDefined();
    });

    describe('deleteCategoryTransaction', () => {
        it('should return void', async () => {
            const { categoryTransactionHelper } = await getMocks();

            const otherCategory = generateCategory({ id: 'I am other id', name: 'Other' });
            const deletedCategory = generateCategory({ id: 'I am delete id', name: 'Delete' });
            const user = generateUser();

            const acceptValue = {
                otherCategoryId: otherCategory.id,
                deletedCategoryId: deletedCategory.id,
                categories: [otherCategory],
                userId: user.id,
            };

            await expect(categoryTransactionHelper.deleteCategoryTransaction(acceptValue)).resolves.not.toThrow();
        });
    });
});
