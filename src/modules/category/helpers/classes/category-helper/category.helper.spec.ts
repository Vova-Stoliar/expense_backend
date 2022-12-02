import { Test } from '@nestjs/testing';
import { CategoryHelper } from './category.helper';
import { generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { DefaultRepository } from '~/repositories/default';
import { UserRepository } from '~/shared/repositories/user';

const getUserRepositoryMock = () => {
    const { categories } = generateUser();

    return {
        update: jest.fn().mockImplementation(() => ({ categories })),
        findMany: jest.fn().mockImplementation(() => [{ categories }]),
    };
};

const getDefaultRepositoryMock = () => {
    const { categories } = generateUser();

    return {
        upsert: jest.fn().mockImplementation(() => ({ data: categories })),
    };
};

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CategoryHelper],
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

    const categoryHelper = moduleRef.get<CategoryHelper>(CategoryHelper);
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
});
