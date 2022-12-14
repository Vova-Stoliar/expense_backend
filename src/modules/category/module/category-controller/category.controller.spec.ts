import { Test } from '@nestjs/testing';
import type { CreateDefaultCategoriesDto, UpdateCategoryDto } from '~/modules/category/dto';
import { CategoryService } from '~/modules/category/module/category-service/category.service';
import { getCategoryServiceMock } from '~/modules/category/module/category-service/mock';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { CategoryController } from './category.controller';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CategoryController],
    })
        .useMocker((token) => {
            if (token === CategoryService) {
                return getCategoryServiceMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const categoryController = moduleRef.get<CategoryController>(CategoryController);

    return { categoryController };
};

describe('CategoryController', () => {
    it('should be defined', async () => {
        const { categoryController } = await getMocks();

        expect(categoryController).toBeDefined();
    });

    describe('create', () => {
        it('should return created category', async () => {
            const { categoryController } = await getMocks();
            const { id, categories } = generateUser();
            const { name, notes, amount } = generateCategory();

            const crateCategoryDto = {
                name,
                notes,
                amount,
            };

            const user = {
                id,
                categories,
            };

            expect(await categoryController.create(crateCategoryDto, user)).toEqual(generateCategory());
        });
    });

    describe('createDefaultCategories', () => {
        it('should return categories', async () => {
            const { categoryController } = await getMocks();
            const { categories } = generateUser();
            const { name, notes, amount } = generateCategory();

            const createDefaultCategoriesDto: CreateDefaultCategoriesDto = {
                categories: [{ name, notes, amount }],
            };

            expect(await categoryController.createDefaultCategories(createDefaultCategoriesDto)).toEqual(categories);
        });
    });

    describe('getAll', () => {
        it('should return categories', async () => {
            const { categoryController } = await getMocks();
            const { categories, id } = generateUser();

            expect(await categoryController.getAll(id)).toEqual(categories);
        });
    });

    describe('update', () => {
        it('should return categories', async () => {
            const { categoryController } = await getMocks();
            const { categories, id: userId } = generateUser();
            const { name, notes, amount, id } = generateCategory();

            const fieldsToUpdateById: UpdateCategoryDto = {
                amount,
                notes,
                name,
            };

            const user = {
                id: userId,
                categories,
            };

            expect(await categoryController.update(fieldsToUpdateById, id, user)).toEqual(generateCategory());
        });
    });

    describe('delete', () => {
        it('should return categories', async () => {
            const { categoryController } = await getMocks();
            const { categories, id: userId } = generateUser();
            const { id } = generateCategory();

            const user = {
                id: userId,
                categories,
            };

            expect(await categoryController.delete(id, user)).toEqual(categories);
        });
    });
});
