import type { Transaction } from '@prisma/client';
import type { CreateParams } from '~/modules/transaction/types';

export type CreateTransaction = Omit<CreateParams, 'transactionToCreate'> & {
    transactionToCreate: CreateParams['transactionToCreate'] & Pick<Transaction, 'id'>;
};
