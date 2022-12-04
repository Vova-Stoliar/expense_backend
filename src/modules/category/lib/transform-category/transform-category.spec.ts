import { transformCategory } from '~/modules/category/lib';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';
jest.mock('uuid', () => ({ v4: () => generateCategory().id }));

describe('transformCategory', () => {
    it('should be defined', () => {
        expect(transformCategory).toBeDefined();
    });

    it('should add "id", "createdAt", "updatedAt" and passed "dateTime"', () => {
        const { name, amount, notes } = generateCategory();

        const acceptValue = { category: { name, amount, notes }, dateTime: DATE_TIME };

        expect(transformCategory(acceptValue)).toEqual(generateCategory());
    });
});
