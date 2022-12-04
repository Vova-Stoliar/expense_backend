import { setTransformedCategoriesLibs } from '~/modules/category/lib';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import { generateCategory } from '~/shared/constants/test';

describe('getSetTransformedCategoriesLibs', () => {
    it('should be defined', () => {
        expect(setTransformedCategoriesLibs()).toBeDefined();
    });

    describe('setCategories', () => {
        const getCategory = () => generateCategory({ id: 'I am a passed id', name: 'I am a passed name' });

        const getAcceptValue = () => {
            return { transformedCategories: { categories: [generateCategory()] }, category: getCategory() };
        };

        const getReturnValue = () => {
            return {
                categories: [generateCategory(), getCategory()],
            };
        };

        it('should add "a category" to "categories"', () => {
            const { setCategories } = setTransformedCategoriesLibs();

            expect(setCategories(getAcceptValue()).categories).toEqual(expect.arrayContaining([getCategory()]));
        });

        it('should return "categories"', () => {
            const { setCategories } = setTransformedCategoriesLibs();

            expect(setCategories(getAcceptValue())).toEqual(getReturnValue());
        });
    });

    describe('setOtherCategory', () => {
        const getCategory = () => generateCategory({ id: 'I am a passed id', name: DEFAULT_CATEGORIES.other });

        const getAcceptValue = () => {
            return { transformedCategories: { otherCategory: undefined }, category: getCategory() };
        };

        const getReturnValue = () => {
            return {
                otherCategory: getCategory(),
            };
        };

        it('should set "other category"', () => {
            const { setOtherCategory } = setTransformedCategoriesLibs();

            expect(setOtherCategory(getAcceptValue())).toEqual(getReturnValue());
        });
    });
});
