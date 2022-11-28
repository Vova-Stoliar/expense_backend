import { getAuthTokens, getPrismaBatchPayload, getUser } from '~/modules/auth/constants/test';

export const getAuthFacadeMockHelper = () => {
    const { email, userName, displayName, id } = getUser();

    const baseUser = { email, userName, displayName, id };

    return {
        getHashedRefreshToken: jest.fn().mockResolvedValue('getUser().hashedRefreshToken'),
        getTokens: jest.fn().mockResolvedValue(getAuthTokens()),
        updateHashedRefreshTokenById: jest.fn().mockResolvedValue(baseUser),
        deleteRefreshTokenById: jest.fn().mockResolvedValue(getPrismaBatchPayload()),
        updateUser: jest.fn().mockResolvedValue(baseUser),
        createUser: jest.fn().mockResolvedValue(baseUser),
    };
};
