import type { Prisma } from '@prisma/client';
import type { BaseUserWith, DateTime, Tokens } from '~/shared/types';

export const dateTime = new Date().toISOString();

export const generateUser = (): BaseUserWith<'password'> & DateTime => ({
    id: 'fdsgdfewfdfds',
    userName: 'Vova Stoliar',
    email: 'vova.stoliar123@gmail.com',
    displayName: 'Admiral',
    password: 'Pasword@2313',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
});

export const generateTokens = (): Tokens & { hashedRefreshToken: Tokens['refreshToken'] } => ({
    refreshToken: 'fdsvcxvvba',
    accessToken: 'fdsvsvzsfesr',
    hashedRefreshToken: 'fdstewtewtggbx',
});

export const generatePrismaBatchPayload = (): Prisma.BatchPayload => ({
    count: 0,
});
