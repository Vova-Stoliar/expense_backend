import type { DeleteCategory } from '~/modules/category/lib/delete-category/delete-category.types';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';
import { deleteCategory } from './delete-category.lib';

const getCategories = () => {
    const getCategoryToDelete = () => {
        return generateCategory({ id: 'I am a passed id 1', name: 'Category to delete', amount: 10 });
    };
    const getOtherCategory = () => {
        return generateCategory({ id: 'I am a passed id 2', name: DEFAULT_CATEGORIES.other, amount: 15 });
    };

    return { getCategoryToDelete, getOtherCategory };
};

const getAcceptValue = (): DeleteCategory => {
    const { getCategoryToDelete, getOtherCategory } = getCategories();

    return {
        categoryToDelete: getCategoryToDelete(),
        categories: [generateCategory(), getOtherCategory(), getCategoryToDelete()],
    };
};

describe('deleteCategory', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));
    });

    it('should be defined', () => {
        expect(deleteCategory).toBeDefined();
    });

    it('should delete a "category" from "categories"', () => {
        const { getCategoryToDelete } = getCategories();

        expect(deleteCategory(getAcceptValue()).categories).toEqual(
            expect.not.arrayContaining([getCategoryToDelete()])
        );
    });

    it('should return "categories"', () => {
        expect(deleteCategory(getAcceptValue()).categories).toEqual(expect.arrayContaining([generateCategory()]));
    });

    it('should return "other category"', () => {
        const { getOtherCategory } = getCategories();

        expect(deleteCategory(getAcceptValue()).otherCategory.id).toBe(getOtherCategory().id);
    });

    it('should add "amount" from "deleted category" to "other category"', () => {
        const { getCategoryToDelete, getOtherCategory } = getCategories();

        const categoryToDelete = getCategoryToDelete();
        const otherCategory = getOtherCategory();

        otherCategory.amount = otherCategory.amount + categoryToDelete.amount;

        expect(deleteCategory(getAcceptValue()).categories).toEqual(expect.arrayContaining([otherCategory]));
    });
});
