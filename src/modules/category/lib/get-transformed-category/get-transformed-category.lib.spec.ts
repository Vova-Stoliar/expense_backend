import { getTransformedCategory } from '~/modules/category/lib';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';
jest.mock('uuid', () => ({ v4: () => generateCategory().id }));

describe('getTransformCategory', () => {
    it('should be defined', () => {
        expect(getTransformedCategory).toBeDefined();
    });

    it('should add "id", "createdAt", "updatedAt" and passed "dateTime"', () => {
        const { name, amount, notes } = generateCategory();

        const acceptValue = { category: { name, amount, notes }, dateTime: DATE_TIME };

        expect(getTransformedCategory(acceptValue)).toEqual(generateCategory());
    });
});
