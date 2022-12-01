import { BadRequestException, Injectable } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { DEFAULT_CATEGORIES } from '~/modules/category/constants';
import type { CreateCategoryDto } from '~/modules/category/dto/create-category.dto';
import type { CreateDefaultCategoriesDto } from '~/modules/category/dto/create-default-categories.dto';
import type { UpdateCategoryDto } from '~/modules/category/dto/update-category.dto';
import { DEFAULT_DATA_NAMES, MESSAGES } from '~/shared/constants';
import { DefaultRepository } from '~/shared/repositories/default';
import { UserRepository } from '~/shared/repositories/user';
import type { Category, Replace } from '~/shared/types';

// TODO substitute globally think about it

interface CreateParams {
    categoryToCreate: CreateCategoryDto;
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}

type DeleteParams = Pick<Category, 'id'> & {
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
};

type UpdateParams = Pick<Category, 'id'> & {
    categoryToUpdate: UpdateCategoryDto;
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
};

interface ValidateCategoryExistenceParams {
    categories: Category[];
    matchCategoryCallback: (category: Category) => boolean;
}

interface AddCategoryParams {
    currentCategories: Category[];
    category: Pick<Category, 'name' | 'amount' | 'notes'>;
}

type SaveCategoriesParams = Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;

interface CategoriesS {
    categories: Category[];
    otherCategory?: Category;
}

interface CategoriesM {
    categories: Category[];
    otherCategory: Category;
    deletedCategory: Category;
}

interface ValidateCategoryConstraintParams extends Pick<Category, 'id'> {
    categories: Category[];
}

interface UpdateCategoriesF extends Pick<Category, 'id'> {
    categories: Category[];
    categoryToUpdate: UpdateCategoryDto;
}

type GetCategoriesD = Pick<User, 'id'> & {
    categories: Category[];
};

@Injectable()
export class CategoryService {
    constructor(private userRepository: UserRepository, private defaultRepository: DefaultRepository) {}

    async create({ categoryToCreate, user }: CreateParams): Promise<Category[]> {
        this.validateCategoryExistence({
            matchCategoryCallback: (category) => category.name === categoryToCreate.name,
            categories: user.categories,
        });

        const categories = this.updateCategories({ currentCategories: user.categories, category: categoryToCreate });

        await this.saveCategories({ id: user.id, categories: categories });

        return categories;
    }

    private async saveCategories(params: SaveCategoriesParams) {
        const { categories, id } = params;

        await this.userRepository.update({
            where: { id },
            data: {
                categories: categories as unknown as Prisma.InputJsonValue,
            },
            select: {
                categories: true,
            },
        });
    }

    private updateCategories(params: AddCategoryParams) {
        const { currentCategories, category } = params;

        const dateTime = new Date().toISOString();

        currentCategories.push({ ...category, createdAt: dateTime, updatedAt: dateTime, id: uuid() });

        return currentCategories;
    }

    async createDefaultCategories(defaultCategories: CreateDefaultCategoriesDto) {
        const categories = this.updateCategoriesS({ categories: defaultCategories.categories });

        await this.upsertDefaultCategories(categories);

        return categories;
    }

    private async upsertDefaultCategories(categories: Category[]) {
        await this.defaultRepository.upsert({
            where: { name: DEFAULT_DATA_NAMES.category },
            create: { name: DEFAULT_DATA_NAMES.category, data: categories as unknown as Prisma.JsonArray },
            update: { data: categories as unknown as Prisma.JsonArray },
        });
    }

    private updateCategoriesS(params: { categories: Pick<Category, 'name' | 'amount' | 'notes'>[] }) {
        const defaultOtherCategory = this.createDefaultOtherCategory();

        const { categories, otherCategory = defaultOtherCategory } = params.categories.reduce(
            (previousValue, defaultCategory) => {
                const { categories = [] } = previousValue;

                if (defaultOtherCategory.name === defaultCategory.name) {
                    previousValue.otherCategory = this.getCategory(defaultCategory, defaultOtherCategory);

                    return previousValue;
                }

                categories.push(this.getCategory(defaultCategory, defaultOtherCategory));

                return previousValue;
            },
            // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
            {} as CategoriesS
        );

        categories.push(otherCategory);

        return categories;
    }

    private getCategory(currentValue: Pick<Category, 'name' | 'amount' | 'notes'>, defaultCategory: Category) {
        const category: Category = {
            ...currentValue,
            createdAt: defaultCategory.createdAt,
            updatedAt: defaultCategory.updatedAt,
            id: uuid(),
        };
        return category;
    }

    private createDefaultOtherCategory(): Category {
        const dateTime = new Date().toISOString();

        return {
            name: DEFAULT_CATEGORIES.other,
            notes: '',
            amount: 0,
            createdAt: dateTime,
            updatedAt: dateTime,
            id: uuid(),
        };
    }

    getAll() {
        return this.userRepository.findMany({
            select: {
                categories: true,
                email: false,
                id: false,
                displayName: false,
                userName: false,
            },
        });
    }

    private validateCategoryExistence(params: ValidateCategoryExistenceParams) {
        const { matchCategoryCallback, categories } = params;

        const category = categories.find(matchCategoryCallback);

        if (category) throw new BadRequestException(MESSAGES.doesExist({ property: category.name }));
    }

    async update(params: UpdateParams) {
        const { categoryToUpdate, id, user } = params;

        this.validateCategoryExistence({
            matchCategoryCallback: (category) => category.id === id,
            categories: user.categories,
        });

        this.validateCategoryConstraint({ categories: user.categories, id });

        const categories = this.updateCategoriesF({ categories: user.categories, id, categoryToUpdate });

        await this.saveCategories({ id, categories });

        return categories;
    }

    private updateCategoriesF(params: UpdateCategoriesF) {
        const { categoryToUpdate, categories, id } = params;

        return categories.map((category) => {
            if (category.id === id) {
                return {
                    ...category,
                    ...categoryToUpdate,
                    updatedAt: new Date().toISOString(),
                };
            }

            return category;
        });
    }

    private validateCategoryConstraint(params: ValidateCategoryConstraintParams) {
        const { categories, id } = params;

        const otherCategory = categories.find(({ name }) => name === DEFAULT_CATEGORIES.other);

        if (otherCategory?.id === id) throw new BadRequestException();
    }

    async delete(params: DeleteParams) {
        const { id, user } = params;

        this.validateCategoryExistence({
            matchCategoryCallback: (category) => category.id === id,
            categories: user.categories,
        });

        this.validateCategoryConstraint({ categories: user.categories, id });

        const categories = this.getCategoriesD({ id, categories: user.categories });

        await this.saveCategories({ id, categories });

        return categories;
    }

    private getCategoriesD(params: GetCategoriesD) {
        function setCategoryToDelete(previousValue: CategoriesM, currentValue: Category) {
            previousValue.deletedCategory = currentValue;

            return previousValue;
        }

        function setOtherCategory(previousValue: CategoriesM, currentValue: Category) {
            previousValue.otherCategory = currentValue;

            return previousValue;
        }

        function setCategories(currentValue: Category, previousValue: CategoriesM) {
            const { categories = [] } = previousValue;

            categories.push(currentValue);

            return previousValue;
        }

        const { categories, otherCategory, deletedCategory } = params.categories.reduce(
            (previousValue, currentValue) => {
                if (currentValue.id === params.id) {
                    return setCategoryToDelete(previousValue, currentValue);
                }

                if (currentValue.name === DEFAULT_CATEGORIES.other) {
                    return setOtherCategory(previousValue, currentValue);
                }

                return setCategories(currentValue, previousValue);
            },
            // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
            {} as CategoriesM
        );

        const updatedOtherCategory = this.updateOtherCategory({ deletedCategory, otherCategory });

        categories.push(updatedOtherCategory);
        return categories;
    }

    private updateOtherCategory(params: { otherCategory: Category; deletedCategory: Category }): Category {
        const { deletedCategory, otherCategory } = params;

        return {
            ...otherCategory,
            updatedAt: new Date().toISOString(),
            amount: otherCategory.amount + deletedCategory.amount,
        };
    }
}
