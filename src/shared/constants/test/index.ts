import type { User } from '@prisma/client';
import type { Category } from '~/shared/types';

export const DATE_TIME = new Date().toISOString();

export const generateCategory = (category: Partial<Category> = {}): Category => {
    return {
        id: '4302c642-0cce-4254-a7ea-ff007e4dc0f2',
        createdAt: DATE_TIME,
        amount: 0,
        updatedAt: DATE_TIME,
        notes: '',
        name: 'Car',
        ...category,
    };
};

export const generateUser = (user: Partial<Replace<User, 'categories', Category[]>> = {}) => ({
    id: '4302c642-0cce-4254-a7ea-ff007e4dc0f2',
    userName: 'Vova Stoliar',
    email: 'vova.stoliar123@gmail.com',
    displayName: 'Admiral',
    password: 'Pasword@2313',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: [generateCategory()],
    isAdmin: true,
    ...user,
});
