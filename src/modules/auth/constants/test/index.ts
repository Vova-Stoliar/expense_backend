import type { Prisma } from '@prisma/client';
import type { Tokens } from '~/shared/types';

export const dateTime = new Date().toISOString();

export const generateTokens = (): Tokens => ({
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
});

export const generatePrismaBatchPayload = (): Prisma.BatchPayload => ({
    count: 0,
});
