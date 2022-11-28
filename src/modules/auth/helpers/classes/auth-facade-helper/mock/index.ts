import { generateTokens, generatePrismaBatchPayload, generateUser } from '~/modules/auth/constants/test';

export const getAuthFacadeMockHelper = () => {
    const { email, userName, displayName, id } = generateUser();

    const baseUser = { email, userName, displayName, id };

    return {
        getHashedRefreshToken: jest.fn().mockResolvedValue('getUser().hashedRefreshToken'),
        getTokens: jest.fn().mockResolvedValue(generateTokens()),
        updateHashedRefreshTokenById: jest.fn().mockResolvedValue(baseUser),
        deleteRefreshTokenById: jest.fn().mockResolvedValue(generatePrismaBatchPayload()),
        updateUser: jest.fn().mockResolvedValue(baseUser),
        createUser: jest.fn().mockResolvedValue(baseUser),
    };
};
