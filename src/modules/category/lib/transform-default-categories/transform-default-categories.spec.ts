import { transformDefaultCategories } from '~/modules/category/lib';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';

jest.mock('uuid', () => ({ v4: () => generateCategory().id }));

const getAcceptValue = () => {
    const category = generateCategory();

    const { name, amount, notes } = category;

    return { categories: [{ name, amount, notes }] };
};

const getOtherCategory = () => generateCategory({ name: DEFAULT_CATEGORIES.other });

describe('transformDefaultCategories', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));
    });

    it('should be defined', () => {
        expect(transformDefaultCategories).toBeDefined();
    });

    it('should return categories', () => {
        const category = generateCategory();

        expect(transformDefaultCategories(getAcceptValue())).toEqual(expect.arrayContaining([category]));
    });

    describe('when "other" category is not passed', () => {
        it('should add "other" category', () => {
            expect(transformDefaultCategories(getAcceptValue())).toEqual(expect.arrayContaining([getOtherCategory()]));
        });
    });

    describe('when "other" category is passed', () => {
        it('should return categories', () => {
            const otherCategory = getOtherCategory();
            const category = generateCategory();

            const { name, amount, notes } = otherCategory;
            const categories = [...getAcceptValue().categories, { name, amount, notes }];

            expect(transformDefaultCategories({ categories })).toEqual([category, otherCategory]);
        });
    });
});
