import type { User } from '@prisma/client';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';

const getRefreshAcceptValue = () => {
    const { email, userName, displayName, id } = generateUser();

    const user: BaseUser = {
        email,
        id,
        userName,
        displayName,
    };

    const acceptValue: { user: BaseUser } & Pick<Tokens, 'refreshToken'> = {
        user,
        refreshToken: generateTokens().refreshToken,
    };

    return { acceptValue };
};

const getRefreshMocks = () => {
    // jest.spyOn(validateRefreshTokenModule, 'validateRefreshToken');

    return { validateRefreshToken: jest.spyOn('validateRefreshTokenModule', 'validateRefreshToken') };
};

const getRefreshReturnValue = () => {
    return { returnValue: generateTokens() };
};

export const generateRefreshLibs = () => {
    return { getRefreshAcceptValue, getRefreshMocks, getRefreshReturnValue };
};
