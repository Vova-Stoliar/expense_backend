import { Test } from '@nestjs/testing';
import type { CreateDefaultCategoriesDto } from '~/modules/category/dto';
import { CategoryFacadeHelper } from '~/modules/category/helpers/classes/category-facade-helper';
import { getCategoryHelperMock } from '~/modules/category/helpers/classes/category-facade-helper/mock';
import * as libs from '~/modules/category/lib';
import { CategoryService } from '~/modules/category/module/category-service/category.service';
import { generateCategory, generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import * as __shared_lib from '~/shared/lib';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CategoryService],
    })
        .useMocker((token) => {
            if (token === CategoryFacadeHelper) {
                return getCategoryHelperMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const categoryService = moduleRef.get<CategoryService>(CategoryService);
    const validateCategoryConstraint = jest.spyOn(libs, 'validateCategoryConstraint');
    const validateValueExistence = jest.spyOn(__shared_lib, 'validateValueExistence');
    const validateIsValueDefined = jest.spyOn(__shared_lib, 'validateIsValueDefined');

    return { categoryService, validateCategoryConstraint, validateValueExistence, validateIsValueDefined };
};

describe('CategoryService', () => {
    it('should be defined', async () => {
        const { categoryService } = await getMocks();

        expect(categoryService).toBeDefined();
    });

    describe('create', () => {
        const getUser = () => {
            const { id, categories } = generateUser();

            return { id, categories };
        };

        const getCategoryToCrate = () => {
            const { name, notes, amount } = generateCategory();

            return { name, notes, amount };
        };

        describe('when "category to create" exists', () => {
            it('should throw error', async () => {
                const { categoryService, validateValueExistence } = await getMocks();

                validateValueExistence.mockImplementation(() => {
                    throw new TypeError();
                });

                const categoryToCreate = getCategoryToCrate();
                const user = getUser();

                await expect(categoryService.create({ categoryToCreate, user })).rejects.toThrow(TypeError);
            });
        });

        describe('when "category to create" does not exist', () => {
            it('should return categories', async () => {
                const { categoryService, validateValueExistence } = await getMocks();
                const { categories } = generateUser();

                validateValueExistence.mockImplementation();

                const categoryToCreate = getCategoryToCrate();
                const user = getUser();

                expect(await categoryService.create({ categoryToCreate, user })).toEqual(categories);
            });
        });
    });

    describe('createDefaultCategories', () => {
        it('should return categories', async () => {
            const { categoryService } = await getMocks();
            const { categories } = generateUser();
            const { name, notes, amount } = generateCategory();

            const createDefaultCategoriesDto: CreateDefaultCategoriesDto = {
                categories: [{ name, notes, amount }],
            };

            jest.spyOn(libs, 'transformDefaultCategories').mockReturnValue(categories);

            expect(await categoryService.createDefaultCategories(createDefaultCategoriesDto)).toEqual(categories);
        });
    });

    describe('getAll', () => {
        it('should return categories', async () => {
            const { categoryService } = await getMocks();
            const { categories, id } = generateUser();

            expect(await categoryService.getAll({ id })).toEqual(categories);
        });
    });

    describe('update', () => {
        const getUser = () => {
            const { id, categories } = generateUser();

            return { id, categories };
        };

        const getFieldsToUpdateById = () => {
            const { name, notes, amount } = generateCategory();

            return { name, notes, amount };
        };

        describe('when "category to update" does not exist', () => {
            it('should throw error', async () => {
                const { categoryService, validateIsValueDefined } = await getMocks();
                const { id } = generateCategory();

                const fieldsToUpdateById = getFieldsToUpdateById();
                const user = getUser();

                validateIsValueDefined.mockImplementation(() => {
                    throw new TypeError();
                });

                await expect(categoryService.update({ fieldsToUpdateById, id, user })).rejects.toThrow(TypeError);
            });
        });

        describe('when "category to update" does not match constraint', () => {
            it('should throw error', async () => {
                const { categoryService, validateCategoryConstraint } = await getMocks();
                const { id } = generateCategory();

                const fieldsToUpdateById = getFieldsToUpdateById();
                const user = getUser();

                validateCategoryConstraint.mockImplementation(() => {
                    throw new TypeError();
                });

                await expect(categoryService.update({ fieldsToUpdateById, id, user })).rejects.toThrow(TypeError);
            });
        });

        describe('when "category to update" exists', () => {
            describe('and when "category to update" matches constraint', () => {
                it('should return categories', async () => {
                    const { categoryService, validateIsValueDefined, validateCategoryConstraint } = await getMocks();
                    const { categories } = generateUser();
                    const { id } = generateCategory();

                    validateCategoryConstraint.mockImplementation();
                    validateIsValueDefined.mockImplementation();

                    const fieldsToUpdateById = getFieldsToUpdateById();
                    const user = getUser();

                    expect(await categoryService.update({ fieldsToUpdateById, id, user })).toEqual(categories);
                });
            });
        });
    });

    describe('delete', () => {
        const getUser = () => {
            const { id, categories } = generateUser();

            return { id, categories };
        };

        describe('when "category to delete" does not exist', () => {
            it('should throw error', async () => {
                const { categoryService, validateIsValueDefined } = await getMocks();
                const { id } = generateCategory();

                const user = getUser();

                validateIsValueDefined.mockImplementation(() => {
                    throw new TypeError();
                });

                await expect(categoryService.delete({ id, user })).rejects.toThrow(TypeError);
            });
        });

        describe('when "category to delete" does not match constraint', () => {
            it('should throw error', async () => {
                const { categoryService, validateCategoryConstraint } = await getMocks();
                const { id } = generateCategory();

                const user = getUser();

                validateCategoryConstraint.mockImplementation(() => {
                    throw new TypeError();
                });

                await expect(categoryService.delete({ id, user })).rejects.toThrow(TypeError);
            });
        });

        describe('when "category to delete" exists', () => {
            describe('and when "category to delete" matches constraint', () => {
                it('should return categories', async () => {
                    const { categoryService, validateIsValueDefined, validateCategoryConstraint } = await getMocks();
                    const { categories } = generateUser();
                    const { id } = generateCategory();

                    validateCategoryConstraint.mockImplementation();
                    validateIsValueDefined.mockImplementation();

                    const user = getUser();

                    expect(await categoryService.delete({ id, user })).toEqual(categories);
                });
            });
        });
    });
});
