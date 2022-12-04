import type { User, Transaction } from '@prisma/client';
import type { CreateTransactionDto } from '~/modules/transaction/dto';
import type { Category, Replace } from '~/shared/types';

export interface CreateParams extends Pick<Transaction, 'categoryId'> {
    transactionToCreate: CreateTransactionDto;
    user: Replace<Pick<User, 'id' | 'categories'>, 'categories', Category[]>;
}

export interface GetAll extends Pick<Transaction, 'categoryId'> {
    userId: User['id'];
}
