import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';

export const getCategoryTransactionServiceMock = () => {
    const { amount, notes, id } = generateCategoryTransaction();
    const categoryTransaction = { amount, notes, id };

    return {
        create: jest.fn().mockResolvedValue(categoryTransaction),
        getAll: jest.fn().mockResolvedValue([categoryTransaction]),
    };
};
