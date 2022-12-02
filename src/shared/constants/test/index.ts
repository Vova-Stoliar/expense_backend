import type { Category } from '~/shared/types';

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

export const generateUser = () => ({
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
