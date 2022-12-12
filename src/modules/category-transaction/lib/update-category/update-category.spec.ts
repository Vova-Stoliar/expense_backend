import { updateCategory } from '~/modules/category-transaction/lib';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';

const getFirstCategory = () => generateCategory({ id: 'first id', name: 'first category' });
const getSecondCategory = () => generateCategory({ id: 'second id', name: 'second category' });

const getAcceptValue = () => {
    const firstCategory = getFirstCategory();
    const secondCategory = getSecondCategory();

    return {
        categoryId: firstCategory.id,
        updatedCategoryFields: {
            amount: 23,
        },
        categories: [firstCategory, secondCategory],
    };
};

describe('updateCategory', () => {
    it('should be defined', () => {
        expect(updateCategory).toBeDefined();
    });

    it('should return categories', () => {
        expect(updateCategory(getAcceptValue()).categories).toEqual(expect.arrayContaining([getSecondCategory()]));
    });

    it('should update "category" by "categoryId"', () => {
        const { updatedCategoryFields } = getAcceptValue();

        const expectedValue = {
            ...getFirstCategory(),
            ...updatedCategoryFields,
            updatedAt: DATE_TIME,
        };

        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));

        expect(updateCategory(getAcceptValue()).categories).toEqual(expect.arrayContaining([expectedValue]));
    });

    it('should return updatedAt', () => {
        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));

        expect(updateCategory(getAcceptValue()).updatedAt).toBe(DATE_TIME);
    });
});
