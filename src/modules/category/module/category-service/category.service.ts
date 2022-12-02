import { BadRequestException, Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { CreateDefaultCategoriesDto } from '~/modules/category/dto';
import { CategoryHelper } from '~/modules/category/helpers/classes/category-helper';
import * as libs from '~/modules/category/lib';
import type { CreateParams, DeleteParams, UpdateParams } from '~/modules/category/types';
import { DEFAULT_DATA_NAMES, MESSAGES } from '~/shared/constants';
import { DefaultRepository } from '~/repositories/default';
import { UserRepository } from '~/shared/repositories/user';
import type { Category } from '~/shared/types';

@Injectable()
export class CategoryService {
    constructor(
        private userRepository: UserRepository,
        private defaultRepository: DefaultRepository,
        private categoryHelper: CategoryHelper
    ) {}

    async create({ categoryToCreate, user }: CreateParams): Promise<Category[]> {
        libs.validateCategoryExistence({
            matchCategoryCallback: (category) => category.name === categoryToCreate.name,
            categories: user.categories,
            error: new BadRequestException(MESSAGES.doesExist({ property: DEFAULT_DATA_NAMES.category })),
        });

        const categories = libs.addCategory({ categories: user.categories, categoryToAdd: categoryToCreate });

        return this.categoryHelper.saveCategories({ userId: user.id, categories: categories });
    }

    async createDefaultCategories(defaultCategories: CreateDefaultCategoriesDto): Promise<Category[]> {
        const categories = libs.transformDefaultCategories({ categories: defaultCategories.categories });

        return this.categoryHelper.upsertDefaultCategories(categories);
    }

    async getAll({ id }: Pick<User, 'id'>): Promise<Category[]> {
        return this.categoryHelper.getAllCategories({ userId: id });
    }

    async update(params: UpdateParams): Promise<Category[]> {
        const { fieldsToUpdateById, id, user } = params;

        libs.validateCategoryExistence({
            matchCategoryCallback: (category) => category.id !== id,
            categories: user.categories,
            error: new BadRequestException(MESSAGES.notExist({ property: DEFAULT_DATA_NAMES.category })),
        });

        libs.validateCategoryConstraint({ categories: user.categories, categoryToValidateId: id });

        const categories = libs.updateCategory({
            categories: user.categories,
            categoryToUpdateId: id,
            fieldsToUpdateById,
        });

        return this.categoryHelper.saveCategories({ userId: user.id, categories });
    }

    async delete(params: DeleteParams): Promise<Category[]> {
        const { id, user } = params;

        libs.validateCategoryExistence({
            matchCategoryCallback: (category) => category.id !== id,
            categories: user.categories,
            error: new BadRequestException(MESSAGES.notExist({ property: DEFAULT_DATA_NAMES.category })),
        });

        libs.validateCategoryConstraint({ categories: user.categories, categoryToValidateId: id });

        const categories = libs.deleteCategory({ categoryToDeleteId: id, categories: user.categories });

        return this.categoryHelper.saveCategories({ userId: user.id, categories });
    }
}
