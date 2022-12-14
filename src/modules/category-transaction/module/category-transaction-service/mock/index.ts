import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';

export const getCategoryTransactionServiceMock = () => {
    const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();
    const categoryTransaction = { amount, notes, id, updatedAt, createdAt };

    return {
        getAll: jest.fn().mockResolvedValue([categoryTransaction]),
        create: jest.fn().mockResolvedValue(categoryTransaction),
        delete: jest.fn().mockResolvedValue(void 0),
        update: jest.fn().mockResolvedValue(categoryTransaction),
        get: jest.fn().mockResolvedValue(categoryTransaction),
    };
};
