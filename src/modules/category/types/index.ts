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

export interface ValidateCategoryConstraintParams {
    categories: Category[];
    categoryToValidateId: Category['id'];
}

export interface GetTransformCategoryParams {
    category: TransformDefaultCategories['categories'][0];
    dateTime: Category['createdAt'];
}

export interface ValidateCategoryExistenceParams {
    categories: Category[];
    matchCategoryCallback: (category: Category) => boolean;
    error: Error;
}

export interface UpdateCategoryParams {
    categories: Category[];
    fieldsToUpdateById: UpdateCategoryDto;
    categoryToUpdateId: Category['id'];
}

export interface TransformDefaultCategories {
    categories: Pick<Category, 'name' | 'amount' | 'notes'>[];
}

export interface DeleteCategory {
    categories: Category[];
    categoryToDeleteId: Category['id'];
}

export interface AddCategoryParams {
    categories: Category[];
    categoryToAdd: Pick<Category, 'name' | 'amount' | 'notes'>;
}
