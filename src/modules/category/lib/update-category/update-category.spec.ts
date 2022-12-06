import { updateCategory } from '~/modules/category/lib';
import { DATE_TIME, generateCategory } from '~/shared/constants/test';

jest.mock('uuid', () => ({ v4: () => generateCategory().id }));

const getCategories = () => {
    const getFirstCategory = () => generateCategory({ name: 'first', id: 'first id' });
    const getSecondCategory = () => generateCategory({ name: 'second', id: 'second id' });

    return { getFirstCategory, getSecondCategory };
};

const getAcceptValue = () => {
    const { getFirstCategory, getSecondCategory } = getCategories();

    const firstCategory = getFirstCategory();
    const secondCategory = getSecondCategory();

    const categories = [firstCategory, secondCategory];

    return {
        categories,
        categoryToUpdateId: secondCategory.id,
        fieldsToUpdateById: { name: 'second updated' },
    };
};

describe('updateCategory', () => {
    const { getFirstCategory, getSecondCategory } = getCategories();

    beforeEach(() => {
        jest.clearAllMocks();

        jest.useFakeTimers().setSystemTime(new Date(DATE_TIME));
    });

    it('should be defined', () => {
        expect(updateCategory).toBeDefined();
    });

    it('should return categories', () => {
        expect(updateCategory(getAcceptValue()).categories).toEqual(expect.arrayContaining([getFirstCategory()]));
    });

    it('should update category by id', () => {
        const { fieldsToUpdateById } = getAcceptValue();

        const updatedSecondCategory = {
            ...getSecondCategory(),
            ...fieldsToUpdateById,
        };

        expect(updateCategory(getAcceptValue()).categories).toEqual(expect.arrayContaining([updatedSecondCategory]));
    });

    it('should return update category by id', () => {
        const { fieldsToUpdateById } = getAcceptValue();

        const updatedSecondCategory = {
            ...getSecondCategory(),
            ...fieldsToUpdateById,
        };

        expect(updateCategory(getAcceptValue()).category).toEqual(updatedSecondCategory);
    });
});
