import type { User } from '@prisma/client';
import * as validateRefreshTokenModule from '~/modules/auth/lib';
import { getAuthTokens, getUser } from '~/modules/auth/constants/test';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';

const getRefreshAcceptValue = () => {
    const { email, userName, displayName, id } = getUser();

    const user: BaseUser = {
        email,
        id,
        userName,
        displayName,
    };

    const acceptValue: { user: BaseUser } & Pick<Tokens, 'refreshToken'> = {
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
