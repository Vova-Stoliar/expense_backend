import { Injectable } from '@nestjs/common';
import type { CreateParams } from '~/modules/transaction/types';

@Injectable()
export class TransactionService {
    create(params: CreateParams) {
        const { transactionToCreate, categoryId, user } = params;
        const { categories, id: userId } = user;

        return { transactionToCreate, categoryId };
    }

    getAll() {
        return `This action returns all transaction`;
    }
}
