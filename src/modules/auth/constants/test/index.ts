import type { Prisma } from '@prisma/client';
import type { Tokens } from '~/shared/types';

export const dateTime = new Date().toISOString();

export const generateTokens = (): Tokens & { hashedRefreshToken: Tokens['refreshToken'] } => ({
    refreshToken: 'fdsvcxvvba',
    accessToken: 'fdsvsvzsfesr',
    hashedRefreshToken: 'fdstewtewtggbx',
});

export const generatePrismaBatchPayload = (): Prisma.BatchPayload => ({
    count: 0,
});
