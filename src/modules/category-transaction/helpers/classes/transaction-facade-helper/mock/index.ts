import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';

export const getTransactionFacadeHelperMock = () => {
    const { amount, notes, id } = generateCategoryTransaction();
    const categoryTransaction = { amount, notes, id };

    return {
        createTransaction: jest.fn().mockResolvedValue(categoryTransaction),
        getAll: jest.fn().mockResolvedValue([categoryTransaction]),
    };
};
