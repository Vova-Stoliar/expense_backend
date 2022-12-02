import { DEFAULT_CATEGORIES } from '~/shared/constants';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';
import { deleteCategory } from './delete-category.lib';

const getCategories = () => {
    const getCategoryToDelete = () => generateCategory({ id: 'I am a passed id 1', name: 'Category to delete' });
    const getOtherCategory = () => generateCategory({ id: 'I am a passed id 2', name: DEFAULT_CATEGORIES.other });

    return { getCategoryToDelete, getOtherCategory };
};

const getAcceptValue = () => {
    const { getCategoryToDelete, getOtherCategory } = getCategories();

    const categoryToDelete = getCategoryToDelete();
    const category = generateCategory();

    return {
        categoryToDeleteId: categoryToDelete.id,
        categories: [category, getOtherCategory(), categoryToDelete],
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
        const categoryToDelete = generateCategory({ id: 'I am a passed id 1', name: 'Category to delete' });

        expect(deleteCategory(getAcceptValue())).toEqual(expect.not.arrayContaining([categoryToDelete]));
    });

    it('should return "categories"', () => {
        expect(deleteCategory(getAcceptValue())).toEqual(expect.arrayContaining([generateCategory()]));
    });

    it('should add "amount" from "deleted category" to "other category"', () => {
        const { getCategoryToDelete, getOtherCategory } = getCategories();

        const categoryToDelete = getCategoryToDelete();
        const otherCategory = getOtherCategory();

        otherCategory.amount = otherCategory.amount + categoryToDelete.amount;

        expect(deleteCategory(getAcceptValue())).toEqual(expect.arrayContaining([otherCategory]));
    });
});
