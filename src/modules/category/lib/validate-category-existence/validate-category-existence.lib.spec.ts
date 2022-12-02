import { validateCategoryExistence } from '~/modules/category/lib';
import { generateCategory } from '~/shared/constants/test';
import type { Category } from '~/shared/types';

const getCategories = () => {
    const getFirstCategory = () => generateCategory({ id: 'first id' });

    return { getFirstCategory };
};

describe('validateCategoryExistence', () => {
    const { getFirstCategory } = getCategories();

    it('should be defined', () => {
        expect(validateCategoryExistence).toBeDefined();
    });

    describe('when "matchCallback" returns true', () => {
        it('should throw error', () => {
            const firstCategory = getFirstCategory();

            const acceptValue = {
                categories: [firstCategory],
                error: new TypeError(),
                matchCategoryCallback: (category: Category) => category.id === firstCategory.id,
            };

            expect(() => validateCategoryExistence(acceptValue)).toThrow();
        });
    });

    describe('when "matchCallback" returns false', () => {
        it('should return void', () => {
            const firstCategory = getFirstCategory();

            const acceptValue = {
                categories: [firstCategory],
                error: new TypeError(),
                matchCategoryCallback: (category: Category) => category.id !== firstCategory.id,
            };

            expect(() => validateCategoryExistence(acceptValue)).not.toThrow();
        });
    });
});
