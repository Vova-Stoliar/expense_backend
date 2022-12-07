import type { Prisma } from '@prisma/client';
import type { Tokens } from '~/shared/types';

export const dateTime = new Date().toISOString();

export const generateTokens = (): Tokens => ({
    accessToken:
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDIyLTEyLTA2VDE1OjQ2OjU4LjUxNFoiLCJpZCI6IjQzMDJjNjQyLTBjY2UtNDI1NC1hN2VhLWZmMDA3ZTRkYzBmMiIsImVtYWlsIjoidm92YS5zdG9saWFyMzFAZ21haWwuY29tIiwiaWF0IjoxNjcwMzQxNjE4LCJleHAiOjE2NzA2MDA4MTh9.8CXuR62AveLmEF0uE1X18EIPh3eZW0OwZNqT3kPubNs',
    refreshToken:
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDIyLTEyLTA2VDE1OjQ2OjU4LjUxNFoiLCJpZCI6IjQzMDJjNjQyLTBjY2UtNDI1NC1hN2VhLWZmMDA3ZTRkYzBmMiIsImVtYWlsIjoidm92YS5zdG9saWFyMzFAZ21haWwuY29tIiwiaWF0IjoxNjcwMzQxNjE4LCJleHAiOjE2NzA5NDY0MTh9.pARbe1iHdVOXrvQzPh0NNw3BM44ipUvzW9LDpP-XrJU',
});

export const generatePrismaBatchPayload = (): Prisma.BatchPayload => ({
    count: 0,
});
