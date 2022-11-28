import type { Prisma } from '@prisma/client';
import type { BaseUserWith, Tokens } from '~/shared/types';

export const generateUser = (): BaseUserWith<'password'> => ({
    id: 'fdsgdfewfdfds',
    userName: 'Vova Stoliar',
    email: 'vova.stoliar123@gmail.com',
    displayName: 'Admiral',
    password: 'Pasword@2313',
});

export const generateTokens = (): Tokens => ({
    refreshToken: 'fdsvcxvvba',
    accessToken: 'fdsvsvzsfesr',
});

export const generatePrismaBatchPayload = (): Prisma.BatchPayload => ({
    count: 0,
});
