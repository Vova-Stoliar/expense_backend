import type { CategoryTransaction } from '@prisma/client';

const DATE_TIME = new Date().toISOString();

export const generateCategoryTransaction = (): CategoryTransaction => {
    return {
        notes: '',
        amount: 10,
        categoryId: 'I am categoryId',
        id: 'I am id',
        createdAt: new Date(DATE_TIME),
        updatedAt: new Date(DATE_TIME),
        userId: 'I am userId',
    };
};
