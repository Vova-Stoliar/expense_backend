import type { User, CategoryTransaction } from '@prisma/client';
import type { UpdateTransactionDto, CreateTransactionDto } from '~/modules/category-transaction/dto';
import type { Category } from '~/shared/types';

export interface CreateTransaction extends Pick<CategoryTransaction, 'categoryId'> {
    transactionToCreate: CreateTransactionDto;
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}

export interface GetAllTransactions extends Pick<CategoryTransaction, 'categoryId'> {
    userId: User['id'];
}

export interface DeleteTransaction extends Pick<CategoryTransaction, 'categoryId'> {
    transactionId: CategoryTransaction['id'];
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}

export interface GetTransaction extends Pick<CategoryTransaction, 'categoryId'> {
    transactionId: CategoryTransaction['id'];
}

export interface UpdateTransaction extends Pick<CategoryTransaction, 'categoryId'> {
    transactionId: CategoryTransaction['id'];
    fieldsToUpdate: UpdateTransactionDto;
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}
