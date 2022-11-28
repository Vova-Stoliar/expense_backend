import type { Prisma, User } from '@prisma/client';
import type { BaseUserWith, Tokens } from '~/shared/types';

export const getUser = (): BaseUserWith<'password'> => ({
    id: 'fdsgdfewfdfds',
    userName: 'Vova Stoliar',
    email: 'vova.stoliar123@gmail.com',
    displayName: 'Admiral',
    password: 'Pasword@2313',
});

export const getAuthTokens = (): Tokens => ({
    refreshToken: 'fdsvcxvvba',
    accessToken: 'fdsvsvzsfesr',
});

export const getPrismaBatchPayload = (): Prisma.BatchPayload => ({
    count: 0,
});
