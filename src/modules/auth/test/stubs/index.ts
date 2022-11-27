import type { Prisma, User } from '@prisma/client';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';

export const getUser = (): BaseUserWith<'password'> & {
    hashedRefreshToken: NonNullable<User['hashedRefreshToken']>;
} => ({
    id: 'fdsgdfewfdfds',
    userName: 'Vova Stoliar',
    email: 'vova.stoliar123@gmail.com',
    displayName: 'Admiral',
    password: 'Pasword@2313',
    hashedRefreshToken: 'fdsfwfdvv',
});

export const getAuthTokens = (): Tokens => ({
    refreshToken: 'fdsvcxvvba',
    accessToken: 'fdsvsvzsfesr',
});

export const getPrismaBatchPayload = (): Prisma.BatchPayload => ({
    count: 0,
});

export const getSignupReturnValue = (): { user: BaseUser } & Tokens => ({
    ...getAuthTokens(),
    user: {
        email: getUser().email,
        userName: getUser().userName,
        displayName: getUser().displayName,
        id: getUser().id,
    },
});

export const getLoginReturnValue = (): { user: Pick<BaseUser, 'email' | 'id'> } & Tokens => ({
    ...getAuthTokens(),
    user: {
        email: getUser().email,
        id: getUser().id,
    },
});

export const getUpdateHashedRefreshTokenByIdReturnValue = (): BaseUser => ({
    email: getUser().email,
    id: getUser().id,
    userName: getUser().userName,
    displayName: getUser().displayName,
});

export const getCreateUserReturnValue = (): BaseUser => ({
    email: getUser().email,
    id: getUser().id,
    userName: getUser().userName,
    displayName: getUser().displayName,
});
