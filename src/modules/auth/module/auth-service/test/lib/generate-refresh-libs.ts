import type { User } from '@prisma/client';
import * as validateRefreshTokenModule from '~/modules/auth/lib';
import { getAuthTokens, getUser } from '~/modules/auth/test/stubs';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';

const getRefreshAcceptValue = () => {
    const { email, userName, displayName, id, hashedRefreshToken } = getUser();

    const user: BaseUser & { hashedRefreshToken: NonNullable<User['hashedRefreshToken']> } = {
        email,
        id,
        hashedRefreshToken,
        userName,
        displayName,
    };

    const acceptValue: { user: BaseUserWith<'hashedRefreshToken'> } & Pick<Tokens, 'refreshToken'> = {
        user,
        refreshToken: getAuthTokens().refreshToken,
    };

    return { acceptValue };
};

const getRefreshMocks = () => {
    jest.spyOn(validateRefreshTokenModule, 'validateRefreshToken');

    return { validateRefreshToken: jest.spyOn(validateRefreshTokenModule, 'validateRefreshToken') };
};

const getRefreshReturnValue = () => {
    return { returnValue: getAuthTokens() };
};

export const generateRefreshLibs = () => {
    return { getRefreshAcceptValue, getRefreshMocks, getRefreshReturnValue };
};
