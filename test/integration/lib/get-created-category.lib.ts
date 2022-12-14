import type { User } from '@prisma/client';
import type { CategoryService } from '~/modules/category/module/category-service/category.service';
import type { Category } from '~/shared/types';
import { getCategoryToCreate } from '../constants';

interface GetCreatedCategoryParams {
    categoryService: CategoryService;
    user: Pick<User, 'id'>;
    categoryToCreate?: Pick<Category, 'amount' | 'name' | 'notes'>;
}

export async function getCreatedCategory(params: GetCreatedCategoryParams) {
    const { categoryService, user, categoryToCreate = getCategoryToCreate() } = params;

    return categoryService.create({
        categoryToCreate,
        user: { id: user.id, categories: [] },
    });
}
