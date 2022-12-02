import { generateUser } from '~/shared/constants/test';

export const getCategoryServiceMock = () => {
    const { categories } = generateUser();

    return {
        create: jest.fn().mockResolvedValue(categories),
        createDefaultCategories: jest.fn().mockResolvedValue(categories),
        getAll: jest.fn().mockResolvedValue(categories),
        update: jest.fn().mockResolvedValue(categories),
        delete: jest.fn().mockResolvedValue(categories),
    };
};
