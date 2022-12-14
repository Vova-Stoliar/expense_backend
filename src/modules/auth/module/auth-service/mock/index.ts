import { expect } from '@jest/globals';
import { validate as uuidValidate } from 'uuid';
import { generateTokens } from '~/modules/auth/constants/test';
import { generateUser } from '~/shared/constants/test';

export const getAuthServiceMock = () => {
    const { email, userName, displayName, id } = generateUser();
    const { refreshToken, accessToken } = generateTokens();

    const tokens = { refreshToken, accessToken };
    const baseUser = { email, userName, displayName, id };

    return {
        login: jest.fn().mockResolvedValue({
            ...tokens,
            user: baseUser,
        }),
        refresh: jest.fn().mockResolvedValue(tokens),
        signup: jest.fn().mockResolvedValue({
            ...tokens,
            user: baseUser,
        }),
        logout: jest.fn().mockResolvedValue(void 0),
        resetPassword: jest.fn().mockResolvedValue({
            ...tokens,
            user: baseUser,
        }),
    };
};
