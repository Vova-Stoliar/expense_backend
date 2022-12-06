import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { transformTransaction } from './transform-transaction.lib';

describe('transformTransaction', () => {
    it('should be defined', () => {
        expect(transformTransaction).toBeDefined();
    });

    it('should return transformed transaction', () => {
        const { amount, notes } = generateCategoryTransaction();

        const expectedValue = {
            amount,
            notes,
            id: expect.toBeUUID(),
        };

        expect(transformTransaction({ amount, notes })).toEqual(expectedValue);
    });
});
