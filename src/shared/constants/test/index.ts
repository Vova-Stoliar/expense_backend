import type { User } from '@prisma/client';
import type { Category, Replace } from '~/shared/types';

export const DATE_TIME = new Date().toISOString();

export const generateCategory = (category: Partial<Category> = {}): Category => {
    return {
        id: 'I am id',
        createdAt: DATE_TIME,
        amount: 0,
        updatedAt: DATE_TIME,
        name: 'I am a name',
        notes: '',
        ...category,
    };
};

export const generateUser = (user: Partial<Replace<User, 'categories', Category[]>> = {}) => ({
    id: 'fdsgdfewfdfds',
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
