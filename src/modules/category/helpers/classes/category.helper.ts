import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import type { SaveCategoriesParams } from '~/modules/category/helpers/types';
import { DEFAULT_DATA_NAMES } from '~/shared/constants';
import { DefaultRepository } from '~/shared/repositories/default';
import { UserRepository } from '~/shared/repositories/user';
import type { Category } from '~/shared/types';

@Injectable()
export class CategoryHelper {
    constructor(private userRepository: UserRepository, private defaultRepository: DefaultRepository) {}

    async saveCategories(params: SaveCategoriesParams) {
        const { categories, id } = params;

        await this.userRepository.update({
            where: { id },
            data: {
                categories: categories as unknown as Prisma.InputJsonValue,
            },
            select: {
                categories: true,
                email: false,
                userName: false,
                displayName: false,
            },
        });
    }

    async upsertDefaultCategories(categories: Category[]) {
        await this.defaultRepository.upsert({
            where: { name: DEFAULT_DATA_NAMES.category },
            create: { name: DEFAULT_DATA_NAMES.category, data: categories as unknown as Prisma.JsonArray },
            update: { data: categories as unknown as Prisma.JsonArray },
            select: { data: true },
        });
    }

    async getAllCategories() {
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
}
