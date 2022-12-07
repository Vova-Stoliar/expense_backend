import type { User, CategoryTransaction } from '@prisma/client';
import type { CreateTransactionDto } from '~/modules/category-transaction/dto';
import type { Category, Replace } from '~/shared/types';

export interface CreateParams extends Pick<CategoryTransaction, 'categoryId'> {
    transactionToCreate: CreateTransactionDto;
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}

export interface GetAllCategories extends Pick<CategoryTransaction, 'categoryId'> {
    userId: User['id'];
}
