import { dateTime, generateTokens } from '~/modules/auth/constants/test';
import { generateUser } from '~/shared/constants/test';

export const getAuthFacadeMockHelper = () => {
    const { email, userName, displayName, id } = generateUser();
    const { refreshToken, accessToken } = generateTokens();

    const baseUser = { email, userName, displayName, id };

    return {
        getTokens: jest.fn().mockResolvedValue({ refreshToken, accessToken, createdAt: dateTime }),
        createUser: jest.fn().mockResolvedValue(baseUser),
        validateUserPassword: jest.fn().mockResolvedValue(baseUser),
        getHashedPassword: jest.fn().mockResolvedValue({ userId: id }),
        updateUser: jest.fn().mockResolvedValue(baseUser),
    };
};
