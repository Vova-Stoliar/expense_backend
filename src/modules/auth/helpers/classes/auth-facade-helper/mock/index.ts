import { generatePrismaBatchPayload, generateTokens, generateUser } from '~/modules/auth/constants/test';

export const getAuthFacadeMockHelper = () => {
    const { email, userName, displayName, id } = generateUser();

    const baseUser = { email, userName, displayName, id };

    return {
        getHashedRefreshToken: jest.fn().mockResolvedValue(generateTokens().hashedRefreshToken),
        getTokens: jest.fn().mockResolvedValue(generateTokens()),
        updateHashedRefreshToken: jest.fn().mockResolvedValue(baseUser),
        deleteRefreshToken: jest.fn().mockResolvedValue(generatePrismaBatchPayload()),
        createUser: jest.fn().mockResolvedValue(baseUser),
        createRefreshToken: jest.fn().mockResolvedValue({ userId: id }),
        validateUserPassword: jest.fn().mockResolvedValue(baseUser),
        updatePassword: jest.fn().mockResolvedValue(baseUser),
    };
};
