import { Injectable } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import { TransactionHelper } from '~/modules/category/helpers/classes/transaction-helper';
import type { SaveCategoriesParams } from '~/modules/category/helpers/types';
import * as libs from '~/modules/category/lib';
import type { DeleteParams } from '~/modules/category/types';
import { DefaultRepository } from '~/repositories/default';
import { DEFAULT_DATA_NAMES } from '~/shared/constants';
import { UserRepository } from '~/shared/repositories/user';
import type { Category } from '~/shared/types';

@Injectable()
export class CategoryFacadeHelper {
    constructor(
        private userRepository: UserRepository,
        private defaultRepository: DefaultRepository,
        private transactionHelper: TransactionHelper
    ) {}

    async saveCategories(params: SaveCategoriesParams): Promise<Category[]> {
        const { categories = [] } = await this.userRepository.update({
            where: { id: params.userId },
            data: {
                categories: params.categories as unknown as Prisma.InputJsonValue,
            },
            select: {
                categories: true,
                email: false,
                userName: false,
                displayName: false,
                id: false,
            },
        });

        return categories as unknown as Category[];
    }

    async upsertDefaultCategories(categories: Category[]): Promise<Category[]> {
        const updatedCategories = await this.defaultRepository.upsert({
            where: { name: DEFAULT_DATA_NAMES.category },
            create: { name: DEFAULT_DATA_NAMES.category, data: categories as unknown as Prisma.JsonArray },
            update: { data: categories as unknown as Prisma.JsonArray },
            select: { data: true },
        });

        return updatedCategories.data as unknown as Category[];
    }

    async getAllCategories({ userId }: { userId: User['id'] }): Promise<Category[]> {
        const user = await this.userRepository.findMany({
            where: {
                id: userId,
            },
            select: {
                categories: true,
                email: false,
                id: false,
                displayName: false,
                userName: false,
            },
        });

        const categories = user[0]?.categories ?? user;

        return categories as unknown as Category[];
    }

    async deleteCategory(params: { categoryToDelete: Category } & Pick<DeleteParams, 'user'>) {
        const { user, categoryToDelete } = params;

        const { categories, otherCategory } = libs.deleteCategory({
            categoryToDelete,
            categories: user.categories,
        });

        await this.transactionHelper.deleteCategoryTransaction({
            categories,
            deletedCategoryId: categoryToDelete.id,
            userId: user.id,
            otherCategoryId: otherCategory.id,
        });

        return categories;
    }
}
