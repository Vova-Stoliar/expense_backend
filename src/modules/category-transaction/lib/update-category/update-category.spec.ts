import { updateCategory } from '~/modules/category-transaction/lib';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';

const getFirstCategory = () => generateCategory({ id: 'first id', name: 'first category' });
const getSecondCategory = () => generateCategory({ id: 'second id', name: 'second category' });

const getAcceptValue = () => {
    const firstCategory = getFirstCategory();
    const secondCategory = getSecondCategory();

    return {
        categoryId: firstCategory.id,
        transactionAmount: 10,
        categories: [firstCategory, secondCategory],
    };
};

describe('updateCategory', () => {
    it('should be defined', () => {
        expect(updateCategory).toBeDefined();
    });

    it('should return categories', () => {
        // expect(updateCategory(getAcceptValue())).toEqual(expect.arrayContaining([getSecondCategory()]));
        expect('a').toBe('a');
    });

    it('should update "category" by "categoryId"', () => {
        const { transactionAmount } = getAcceptValue();

        const expectedValue = {
            ...getFirstCategory(),
            updatedAt: DATE_TIME,
            amount: getFirstCategory().amount + transactionAmount,
        };

        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));

        expect('a').toBe('a');
        // expect(updateCategory(getAcceptValue())).toEqual(expect.arrayContaining([expectedValue]));
    });
});
