import type { User } from '@prisma/client';
import type { CreateCategoryDto } from '~/modules/category/dto';
import type { UpdateCategoryDto } from '~/modules/category/dto/update-category.dto';
import type { Category, Replace } from '~/shared/types';

export interface CreateParams {
    categoryToCreate: CreateCategoryDto;
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}

export interface DeleteParams extends Pick<Category, 'id'> {
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}

export interface UpdateParams extends Pick<Category, 'id'> {
    fieldsToUpdateById: UpdateCategoryDto;
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}

export interface TransformedCategories {
    categories: Category[];
    otherCategory: Category;
}
