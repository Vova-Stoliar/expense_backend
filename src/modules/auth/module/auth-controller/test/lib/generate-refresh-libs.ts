import type { User } from '@prisma/client';
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

const getRefreshReturnValue = () => {
    return { returnValue: getAuthTokens() };
};

export const generateRefreshLibs = () => {
    return { getRefreshAcceptValue, getRefreshReturnValue };
};
