import * as libs from '~/modules/category/lib';
import { addCategory } from '~/modules/category/lib';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';

const getAcceptValue = () => {
    const category = generateCategory();
    const { name, notes, amount } = generateCategory();

    const categoryToAdd = { name, notes, amount };

    return { categoryToAdd, categories: [category] };
};

describe('addCategory', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));
    });

    it('should be defined', () => {
        expect(addCategory).toBeDefined();
    });

    it('should add "category" to passed "categories and return "categories"', () => {
        jest.spyOn(libs, 'transformCategory').mockReturnValue(generateCategory());
        expect(addCategory(getAcceptValue())).toEqual(expect.arrayContaining([generateCategory()]));
    });

    it('should return "categories"', () => {
        expect(addCategory(getAcceptValue())).toEqual(expect.arrayContaining([generateCategory()]));
    });
});
