import { Test } from '@nestjs/testing';
import { AppModule } from '~/app/app.module';
import { AuthService } from '~/modules/auth/module/auth-service';
import type { CreateDefaultCategoriesDto } from '~/modules/category/dto';
import { CategoryService } from '~/modules/category/module/category-service/category.service';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { DefaultRepository } from '~/repositories/default';
import { generateCategory } from '~/shared/constants/test';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';
import { getCategoryToCreate, getCreatedUser } from '../constants';
import { getCreatedCategory } from '../lib';

describe('CategoryService', () => {
    let categoryService: CategoryService;
    let prismaService: PrismaService;
    let authService: AuthService;

    let categoryTransactionRepository: CategoryTransactionRepository;
    let userRepository: UserRepository;
    let defaultRepository: DefaultRepository;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        categoryService = moduleRef.get<CategoryService>(CategoryService);
        prismaService = moduleRef.get<PrismaService>(PrismaService);
        authService = moduleRef.get<AuthService>(AuthService);

        categoryTransactionRepository = moduleRef.get<CategoryTransactionRepository>(CategoryTransactionRepository);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
        defaultRepository = moduleRef.get<DefaultRepository>(DefaultRepository);

        await prismaService.$transaction([
            categoryTransactionRepository.deleteMany(),
            userRepository.deleteMany(),
            defaultRepository.deleteMany(),
        ]);
    });

    afterEach(async () => {
        await prismaService.$transaction([
            categoryTransactionRepository.deleteMany(),
            userRepository.deleteMany(),
            defaultRepository.deleteMany(),
        ]);
    });

    afterAll(async () => {
        await prismaService.$disconnect();
    });

    it('should be defined', async () => {
        expect(categoryService).toBeDefined();
    });

    describe('create', () => {
        describe('when "category to create" exists', () => {
            it('should throw error', async () => {
                const user = await getCreatedUser({ authService });

                const categoryToCreate = getCategoryToCreate();
                const { amount, name, notes, id, updatedAt, createdAt } = generateCategory({
                    name: categoryToCreate.name,
                });

                const acceptValue = {
                    categoryToCreate,
                    user: {
                        id: user.id,
                        categories: [{ amount, name, notes, id, updatedAt, createdAt }],
                    },
                };

                await expect(categoryService.create(acceptValue)).rejects.toThrow();
            });
        });

        describe('when "category to create" does not exist', () => {
            it('should return created category', async () => {
                const user = await getCreatedUser({ authService });

                const categoryToCreate = getCategoryToCreate();
                const { amount, name, notes } = categoryToCreate;

                const acceptValue = {
                    categoryToCreate,
                    user: {
                        id: user.id,
                        categories: [],
                    },
                };

                const expectedValue = {
                    id: expect.toBeUUID(),
                    amount,
                    name,
                    notes,
                };

                expect(await categoryService.create(acceptValue)).toMatchObject(expectedValue);
            });
        });
    });

    describe('createDefaultCategories', () => {
        describe('when category with the name "other" does not exist', () => {
            it('should add category "other" by default', async () => {
                const category = generateCategory();
                const otherCategory = generateCategory({ name: 'Other', id: expect.toBeUUID() });

                const acceptValue: CreateDefaultCategoriesDto = {
                    categories: [{ name: category.name, notes: category.notes, amount: category.amount }],
                };

                const expectedValue = {
                    id: otherCategory.id,
                    name: otherCategory.name,
                    amount: otherCategory.amount,
                    notes: otherCategory.notes,
                };

                expect(await categoryService.createDefaultCategories(acceptValue)).toEqual(
                    expect.arrayContaining([expect.objectContaining(expectedValue)])
                );
            });
        });

        describe('when category with the name "other" exists', () => {
            it('should return categories', async () => {
                const category = generateCategory();
                const otherCategory = generateCategory({ name: 'Other' });

                const acceptValue: CreateDefaultCategoriesDto = {
                    categories: [
                        { name: category.name, notes: category.notes, amount: category.amount },
                        { name: otherCategory.name, notes: otherCategory.notes, amount: otherCategory.amount },
                    ],
                };

                const expectedResult = [
                    { name: category.name, notes: category.notes, amount: category.amount, id: expect.toBeUUID() },
                    {
                        name: otherCategory.name,
                        notes: otherCategory.notes,
                        amount: otherCategory.amount,
                        id: expect.toBeUUID(),
                    },
                ];

                expect(await categoryService.createDefaultCategories(acceptValue)).toEqual(
                    expect.arrayContaining(expectedResult.map((value) => expect.objectContaining(value)))
                );
            });
        });
    });

    describe('getAll', () => {
        it('should return categories', async () => {
            const user = await getCreatedUser({ authService });

            const categoryToCreate = getCategoryToCreate();
            const { amount, name, notes } = categoryToCreate;

            await categoryService.create({ categoryToCreate, user: { id: user.id, categories: [] } });

            const expectedValue = {
                id: expect.toBeUUID(),
                amount,
                name,
                notes,
            };

            expect(await categoryService.getAll({ id: user.id })).toEqual(
                expect.arrayContaining([expect.objectContaining(expectedValue)])
            );
        });
    });

    describe('update', () => {
        describe('when "category to update" does not exist', () => {
            it('should throw error', async () => {
                const user = await getCreatedUser({ authService });
                const createdCategory = await getCreatedCategory({ categoryService, user });

                const acceptValue = {
                    fieldsToUpdateById: {
                        amount: 10,
                    },
                    id: createdCategory.id,
                    user: {
                        id: user.id,
                        categories: [],
                    },
                };

                await expect(categoryService.update(acceptValue)).rejects.toThrow();
            });
        });

        describe('when "category to update" does not match constraint', () => {
            it('should throw error', async () => {
                const user = await getCreatedUser({ authService });
                const createdCategory = await getCreatedCategory({
                    categoryService,
                    user,
                    categoryToCreate: { name: 'Other', amount: 0, notes: '' },
                });

                const acceptValue = {
                    fieldsToUpdateById: {
                        amount: 10,
                    },
                    id: createdCategory.id,
                    user: {
                        id: user.id,
                        categories: [createdCategory],
                    },
                };

                await expect(categoryService.update(acceptValue)).rejects.toThrow();
            });
        });

        describe('when "category to update" exists', () => {
            describe('and when "category to update" matches constraint', () => {
                it('should return updated category', async () => {
                    const user = await getCreatedUser({ authService });
                    const createdCategory = await getCreatedCategory({ categoryService, user });

                    const fieldsToUpdateById = {
                        amount: 10,
                    };

                    const acceptValue = {
                        fieldsToUpdateById,
                        id: createdCategory.id,
                        user: {
                            id: user.id,
                            categories: [createdCategory],
                        },
                    };

                    const { name, notes } = getCategoryToCreate();

                    const expectedValue = {
                        id: expect.toBeUUID(),
                        amount: fieldsToUpdateById.amount,
                        name,
                        notes,
                    };

                    expect(await categoryService.update(acceptValue)).toMatchObject(expectedValue);
                });
            });
        });
    });

    describe('delete', () => {
        describe('when "category to delete" does not exist', () => {
            it('should throw error', async () => {
                const user = await getCreatedUser({ authService });
                const createdCategory = await getCreatedCategory({ categoryService, user });

                const acceptValue = {
                    id: createdCategory.id,
                    user: {
                        id: user.id,
                        categories: [],
                    },
                };

                await expect(categoryService.delete(acceptValue)).rejects.toThrow();
            });
        });

        describe('when "category to delete" does not match constraint', () => {
            it('should throw error', async () => {
                const user = await getCreatedUser({ authService });
                const createdCategory = await getCreatedCategory({ categoryService, user });

                const acceptValue = {
                    id: createdCategory.id,
                    user: {
                        id: user.id,
                        categories: [createdCategory],
                    },
                };

                await expect(categoryService.delete(acceptValue)).rejects.toThrow();
            });
        });

        describe('when "category to delete" exists', () => {
            describe('and when "category to delete" matches constraint', () => {
                it('should return categories', async () => {
                    const user = await getCreatedUser({ authService });
                    const createdCategory = await getCreatedCategory({ categoryService, user });

                    const otherCategory = generateCategory({ name: 'Other' });

                    const acceptValue = {
                        id: createdCategory.id,
                        user: {
                            id: user.id,
                            categories: [createdCategory, otherCategory],
                        },
                    };

                    const expectedValue = {
                        amount: otherCategory.amount,
                        createdAt: otherCategory.createdAt,
                        id: otherCategory.id,
                        name: otherCategory.name,
                        notes: otherCategory.notes,
                    };

                    expect(await categoryService.delete(acceptValue)).toEqual(
                        expect.arrayContaining([expect.objectContaining(expectedValue)])
                    );
                });
            });
        });
    });
});
