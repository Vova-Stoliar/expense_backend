import { generateCategory } from '~/shared/constants/test';

export const getCategoryServiceMock = () => {
    const category = generateCategory();

    return {
        create: jest.fn().mockResolvedValue(category),
        createDefaultCategories: jest.fn().mockResolvedValue([category]),
        getAll: jest.fn().mockResolvedValue([category]),
        update: jest.fn().mockResolvedValue(category),
        delete: jest.fn().mockResolvedValue([category]),
    };
};
