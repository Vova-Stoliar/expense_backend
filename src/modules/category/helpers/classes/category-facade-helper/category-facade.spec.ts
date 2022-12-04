import { Test } from '@nestjs/testing';
import { DEFAULT_CATEGORIES } from '~/shared/constants';
import { CategoryFacadeHelper } from './category-facade.helper';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { DefaultRepository } from '~/repositories/default';
import { UserRepository } from '~/shared/repositories/user';

const getUserRepositoryMock = () => {
    return {
        update: jest.fn().mockImplementation(() => ({ categories: [generateCategory()] })),
        findMany: jest.fn().mockImplementation(() => [{ categories: [generateCategory()] }]),
    };
};

const getDefaultRepositoryMock = () => {
    return {
        upsert: jest.fn().mockImplementation(() => ({ data: [generateCategory()] })),
    };
};

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CategoryFacadeHelper],
    })
        .useMocker((token) => {
            if (token === UserRepository) {
                return getUserRepositoryMock();
            }

            if (token === DefaultRepository) {
                return getDefaultRepositoryMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const categoryHelper = moduleRef.get<CategoryFacadeHelper>(CategoryFacadeHelper);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { categoryHelper, userRepository };
};

describe('CategoryHelper', () => {
    it('should be defined', async () => {
        const { categoryHelper } = await getMocks();

        expect(categoryHelper).toBeDefined();
    });

    describe('saveCategories', () => {
        it('should return categories', async () => {
            const { categoryHelper } = await getMocks();
            const { id, categories } = generateUser();

            expect(await categoryHelper.saveCategories({ userId: id, categories })).toEqual(categories);
        });
    });

    describe('upsertDefaultCategories', () => {
        it('should return categories', async () => {
            const { categoryHelper } = await getMocks();
            const { categories } = generateUser();

            expect(await categoryHelper.upsertDefaultCategories(categories)).toEqual(categories);
        });
    });

    describe('getAllCategories', () => {
        it('should return categories', async () => {
            const { categoryHelper } = await getMocks();
            const { id, categories } = generateUser();

            expect(await categoryHelper.getAllCategories({ userId: id })).toEqual(categories);
        });
    });

    describe('deleteCategory', () => {
        it('should return categories', async () => {
            const { categoryHelper } = await getMocks();
            const { id } = generateUser();

            const otherCategory = generateCategory({ id: 'I am otherCategory id', name: DEFAULT_CATEGORIES.other });
            const categoryToDelete = generateCategory({ id: 'I am categoryToDelete id', name: 'categoryToDelete' });
            const category = generateCategory();

            const acceptValue = {
                categoryToDelete,
                user: {
                    categories: [category, categoryToDelete, otherCategory],
                    id,
                },
            };

            jest.useFakeTimers().setSystemTime(new Date(category.createdAt));

            expect(await categoryHelper.deleteCategory(acceptValue)).toEqual([category, otherCategory]);
        });
    });
});
