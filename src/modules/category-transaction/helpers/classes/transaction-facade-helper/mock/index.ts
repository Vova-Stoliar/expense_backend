import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';

export const getTransactionFacadeHelperMock = () => {
    const { amount, notes, id, updatedAt, createdAt } = generateCategoryTransaction();
    const categoryTransaction = { amount, notes, id, updatedAt, createdAt };

    return {
        createTransaction: jest.fn().mockResolvedValue(categoryTransaction),
        getAllTransactions: jest.fn().mockResolvedValue([categoryTransaction]),
        deleteTransaction: jest.fn().mockResolvedValue(void 0),
        updateTransaction: jest.fn().mockResolvedValue(categoryTransaction),
        validateTransaction: jest.fn().mockResolvedValue(categoryTransaction),
    };
};
