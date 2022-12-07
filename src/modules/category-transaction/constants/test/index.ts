import type { CategoryTransaction } from '@prisma/client';
import { DATE_TIME } from '~/shared/constants/test';

export const generateCategoryTransaction = (): CategoryTransaction => {
    return {
        notes: 'notes about transaction',
        amount: 10,
        categoryId: 'fe21c394-17d0-43dd-b7be-382afb2dbf90',
        id: 'fe21c394-17d0-43dd-b7be-382afb2dbf90',
        createdAt: new Date(DATE_TIME),
        updatedAt: new Date(DATE_TIME),
        userId: 'fe21c394-17d0-43dd-b7be-382afb2dbf90',
    };
};
