import { validateCategoryConstraint } from '~/modules/category/lib';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import { generateCategory } from '~/shared/constants/test';

const getCategories = () => {
    const getOtherCategory = () => generateCategory({ name: DEFAULT_CATEGORIES.other, id: 'other id' });
    const getFirstCategory = () => generateCategory({ name: 'first' });

    return { getOtherCategory, getFirstCategory };
};

describe('validateCategoryConstraint', () => {
    const { getOtherCategory, getFirstCategory } = getCategories();

    it('should be defined', () => {
        expect(validateCategoryConstraint).toBeDefined();
    });

    describe('when "passed category id" is not "other category id"', () => {
        it('should return "void"', () => {
            const firstCategory = getFirstCategory();
            const categories = [firstCategory, getOtherCategory()];
            const acceptValue = { categories, categoryToValidateId: firstCategory.id };

            expect(() => validateCategoryConstraint(acceptValue)).not.toThrow();
        });
    });

    describe('when "passed category id" is "other category id"', () => {
        it('should return throw error', () => {
            const { getOtherCategory, getFirstCategory } = getCategories();

            const otherCategory = getOtherCategory();
            const categories = [getFirstCategory(), otherCategory];
            const acceptValue = { categories, categoryToValidateId: otherCategory.id };

            expect(() => validateCategoryConstraint(acceptValue)).toThrow();
        });
    });
});
