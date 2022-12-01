import { Injectable } from '@nestjs/common';
import type { CreateDefaultCategoriesDto } from '~/modules/category/dto';
import { CategoryHelper } from '~/modules/category/helpers/classes/category.helper';
import * as libs from '~/modules/category/lib';
import type { CreateParams, DeleteParams, UpdateParams } from '~/modules/category/types';
import { DefaultRepository } from '~/shared/repositories/default';
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
        });

        const categories = libs.addCategory({ categories: user.categories, categoryToAdd: categoryToCreate });

        await this.categoryHelper.saveCategories({ id: user.id, categories: categories });

        return categories;
    }

    async createDefaultCategories(defaultCategories: CreateDefaultCategoriesDto) {
        const categories = libs.transformDefaultCategories({ categories: defaultCategories.categories });

        return this.categoryHelper.upsertDefaultCategories(categories);
    }

    async getAll() {
        return this.categoryHelper.getAllCategories();
    }

    async update(params: UpdateParams) {
        const { fieldsToUpdateById, id, user } = params;

        libs.validateCategoryExistence({
            matchCategoryCallback: (category) => category.id === id,
            categories: user.categories,
        });

        libs.validateCategoryConstraint({ categories: user.categories, categoryToValidateId: id });

        const categories = libs.updateCategory({
            categories: user.categories,
            categoryToUpdateId: id,
            fieldsToUpdateById,
        });

        return this.categoryHelper.saveCategories({ id, categories });
    }

    async delete(params: DeleteParams) {
        const { id, user } = params;

        libs.validateCategoryExistence({
            matchCategoryCallback: (category) => category.id === id,
            categories: user.categories,
        });

        libs.validateCategoryConstraint({ categories: user.categories, categoryToValidateId: id });

        const categories = libs.deleteCategory({ categoryToDeleteId: id, categories: user.categories });

        return this.categoryHelper.saveCategories({ id, categories });
    }
}
