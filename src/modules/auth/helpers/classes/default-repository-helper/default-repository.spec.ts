import { Test } from '@nestjs/testing';
import type { Default, Prisma } from '@prisma/client';
import { DEFAULT_DATA_NAMES } from '~/shared/constants';
import { generateCategory } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { DefaultRepository } from '~/repositories/default';
import { DefaultRepositoryHelper } from './default-repository.helper';
import * as libs from '~/modules/auth/lib';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [DefaultRepositoryHelper],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const defaultRepositoryHelper = moduleRef.get<DefaultRepositoryHelper>(DefaultRepositoryHelper);
    const defaultRepository = moduleRef.get<DefaultRepository>(DefaultRepository);

    return { defaultRepositoryHelper, defaultRepository };
};

describe('DefaultRepositoryHelper', () => {
    it('should be defined', async () => {
        const { defaultRepositoryHelper } = await getMocks();

        expect(defaultRepositoryHelper).toBeDefined();
    });

    describe('when "categories" are in "database"', () => {
        it('should return "categories"', async () => {
            const { defaultRepositoryHelper, defaultRepository } = await getMocks();

            const category = generateCategory();

            const resolvedValue: Default = {
                data: [category as unknown as Prisma.JsonValue],
                id: 'I am id',
                createdAt: new Date(),
                name: DEFAULT_DATA_NAMES.category,
                updatedAt: new Date(),
            };

            jest.spyOn(defaultRepository, 'findMany').mockResolvedValue([resolvedValue]);

            expect(await defaultRepositoryHelper.getCategories()).toEqual(resolvedValue.data);
        });
    });

    describe('when categories are not in database', () => {
        it('should return generated default "categories"', async () => {
            const { defaultRepositoryHelper, defaultRepository } = await getMocks();

            const category = generateCategory();

            jest.spyOn(defaultRepository, 'findMany').mockResolvedValue([]);
            jest.spyOn(libs, 'getDefaultCategories').mockReturnValue([category]);

            expect(await defaultRepositoryHelper.getCategories()).toEqual([category]);
        });
    });
});
