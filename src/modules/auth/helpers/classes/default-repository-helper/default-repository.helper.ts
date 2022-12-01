import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { getDefaultCategories } from '~/modules/auth/lib';
import { DEFAULT_DATA_NAMES } from '~/shared/constants';
import { DefaultRepository } from '~/shared/repositories/default';

@Injectable()
export class DefaultRepositoryHelper {
    constructor(private defaultRepository: DefaultRepository) {}

    async getCategories() {
        const [{ data: categories }] = await this.defaultRepository.findMany({
            where: { name: DEFAULT_DATA_NAMES.category },
            select: { data: true },
        });

        if (categories) return categories;

        return getDefaultCategories() as unknown as Prisma.JsonArray;
    }
}
