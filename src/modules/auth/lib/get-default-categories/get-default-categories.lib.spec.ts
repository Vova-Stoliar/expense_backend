import { getDefaultCategories } from '~/modules/auth/lib';
import * as constants from '~/shared/constants';
import { generateCategory } from '~/shared/constants/test';

jest.mock('uuid', () => ({ v4: () => generateCategory().id }));

describe('getDefaultCategories', () => {
    it('should be defined', () => {
        expect(getDefaultCategories).toBeDefined();
    });

    it('should return categories', () => {
        const category = generateCategory();

        jest.useFakeTimers().setSystemTime(new Date(category.createdAt));

        Object.defineProperty(constants, 'DEFAULT_CATEGORIES', { value: { other: category.name } });

        expect(getDefaultCategories()).toEqual([category]);
    });
});
