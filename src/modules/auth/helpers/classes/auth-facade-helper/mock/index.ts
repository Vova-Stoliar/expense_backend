import { getAuthTokens, getPrismaBatchPayload, getUser } from '~/modules/auth/constants/test';

export const getAuthFacadeMockHelper = () => {
    const { email, userName, displayName, id } = getUser();

    return {
        getHashedRefreshToken: jest.fn().mockResolvedValue(getUser().hashedRefreshToken),
        getTokens: jest.fn().mockResolvedValue(getAuthTokens()),
        updateHashedRefreshTokenById: jest.fn().mockResolvedValue({
            email,
            id,
            userName,
            displayName,
        }),
        deleteRefreshTokenById: jest.fn().mockResolvedValue(getPrismaBatchPayload()),
        createUser: jest.fn().mockResolvedValue({
            email,
            id,
            userName,
            displayName,
        }),
    };
};
