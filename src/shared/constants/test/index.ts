import type { User } from '@prisma/client';
import type { Category, DateTime, Replace } from '~/shared/types';

export const DATE_TIME = new Date().toISOString();

export const generateCategory = (params?: Partial<Category>): Category => {
    const { id = 'I am id', name = 'I am a name', amount = 0, notes = '' } = params ?? {};

    return {
        id,
        createdAt: DATE_TIME,
        amount,
        updatedAt: DATE_TIME,
        name,
        notes,
    };
};

type GenerateUser = () => Replace<Omit<User, 'createdAt' | 'updatedAt'>, 'categories', Category[]> & DateTime;

export const generateUser: GenerateUser = () => ({
    id: 'fdsgdfewfdfds',
    userName: 'Vova Stoliar',
    email: 'vova.stoliar123@gmail.com',
    displayName: 'Admiral',
    password: 'Pasword@2313',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: [generateCategory()],
    isAdmin: true,
});
