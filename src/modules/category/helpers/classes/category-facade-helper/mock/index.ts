import { generateUser } from '~/shared/constants/test';

export const getCategoryHelperMock = () => {
    const { categories } = generateUser();

    return {
        saveCategories: jest.fn().mockResolvedValue(categories),
        upsertDefaultCategories: jest.fn().mockResolvedValue(categories),
        getAllCategories: jest.fn().mockResolvedValue(categories),
    };
};
