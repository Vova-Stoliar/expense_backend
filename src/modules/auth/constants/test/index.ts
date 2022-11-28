import type { Prisma, Token } from '@prisma/client';
import type { BaseUserWith, Tokens } from '~/shared/types';

export const generateUser = (): BaseUserWith<'password'> => ({
    id: 'fdsgdfewfdfds',
    userName: 'Vova Stoliar',
    email: 'vova.stoliar123@gmail.com',
    displayName: 'Admiral',
    password: 'Pasword@2313',
});

export const generateTokens = (): Tokens & Pick<Token, 'hashedRefreshToken'> => ({
    refreshToken: 'fdsvcxvvba',
    accessToken: 'fdsvsvzsfesr',
    hashedRefreshToken: 'fdstewtewtggbx',
});

export const generatePrismaBatchPayload = (): Prisma.BatchPayload => ({
    count: 0,
});

export const dateTime = new Date().toISOString();
