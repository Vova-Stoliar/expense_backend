import { BadRequestException, Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { CreateDefaultCategoriesDto } from '~/modules/category/dto';
import { CategoryFacadeHelper } from '~/modules/category/helpers/classes/category-facade-helper';
import * as libs from '~/modules/category/lib';
import type { CreateParams, DeleteParams, UpdateParams } from '~/modules/category/types';
import { DEFAULT_DATA_NAMES, MESSAGES } from '~/shared/constants';
import { validateIsValueDefined, validateValueExistence } from '~/shared/lib';
import type { Category } from '~/shared/types';

@Injectable()
export class CategoryService {
    constructor(private categoryFacadeHelper: CategoryFacadeHelper) {}

    async create({ categoryToCreate, user }: CreateParams): Promise<Category[]> {
        validateValueExistence({
            matchValueCallback: (category) => category.name === categoryToCreate.name,
            values: user.categories,
            error: new BadRequestException(MESSAGES.doesExist({ property: DEFAULT_DATA_NAMES.category })),
            shouldValueExist: false,
        });

        const categories = libs.addCategory({ categories: user.categories, categoryToAdd: categoryToCreate });

        return this.categoryFacadeHelper.saveCategories({ userId: user.id, categories: categories });
    }

    async createDefaultCategories(defaultCategories: CreateDefaultCategoriesDto): Promise<Category[]> {
        const categories = libs.transformDefaultCategories({ categories: defaultCategories.categories });

        return this.categoryFacadeHelper.upsertDefaultCategories(categories);
    }

    async getAll({ id }: Pick<User, 'id'>): Promise<Category[]> {
        return this.categoryFacadeHelper.getAllCategories({ userId: id });
    }

    async update(params: UpdateParams): Promise<Category[]> {
        const { fieldsToUpdateById, id, user } = params;

        validateIsValueDefined({
            error: new BadRequestException(MESSAGES.notExist({ property: DEFAULT_DATA_NAMES.category })),
            value: user.categories.find((category) => category.id === id),
        });

        libs.validateCategoryConstraint({ categories: user.categories, categoryToValidateId: id });

        const categories = libs.updateCategory({
            categories: user.categories,
            categoryToUpdateId: id,
            fieldsToUpdateById,
        });

        return this.categoryFacadeHelper.saveCategories({ userId: user.id, categories });
    }

    async delete(params: DeleteParams): Promise<Category[]> {
        const { id, user } = params;

        const categoryToDelete = validateIsValueDefined({
            error: new BadRequestException(MESSAGES.notExist({ property: DEFAULT_DATA_NAMES.category })),
            value: user.categories.find((category) => category.id === id),
        });

        libs.validateCategoryConstraint({ categories: user.categories, categoryToValidateId: id });

        return this.categoryFacadeHelper.deleteCategory({ categoryToDelete, user });
    }
}
