import { dateTime, generateTokens } from '~/modules/auth/constants/test';

export const getJwtHelperMock = () => {
    const { refreshToken, accessToken } = generateTokens();

    return {
        getTokens: jest.fn().mockResolvedValue({ refreshToken, accessToken, createdAt: dateTime }),
    };
};
