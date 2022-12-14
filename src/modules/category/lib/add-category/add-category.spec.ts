import { addCategory } from '~/modules/category/lib';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';

const getAcceptValue = () => {
    const category = generateCategory();
    const { name, notes, amount } = generateCategory();

    const categoryToAdd = { name, notes, amount };

    return { categoryToAdd, categories: [category] };
};

const getAddedCategory = () => {
    const { categoryToAdd } = getAcceptValue();

    return {
        ...categoryToAdd,
        createdAt: DATE_TIME,
        updatedAt: DATE_TIME,
        id: expect.toBeUUID(),
    };
};

describe('addCategory', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();

        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));
    });

    it('should be defined', () => {
        expect(addCategory).toBeDefined();
    });

    it('should add "category" to passed "categories and return "categories"', () => {
        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));

        expect(addCategory(getAcceptValue()).categories).toEqual(expect.arrayContaining([getAddedCategory()]));
    });

    it('should return "categories"', () => {
        expect(addCategory(getAcceptValue()).categories).toEqual(expect.arrayContaining([generateCategory()]));
    });

    it('should return "category"', () => {
        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));

        expect(addCategory(getAcceptValue()).category).toEqual(getAddedCategory());
    });
});
