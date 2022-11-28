import { generateTokens, generateUser } from '~/modules/auth/constants/test';

export const getBcryptHelperMock = () => ({
    getHashedRefreshToken: jest.fn().mockResolvedValue(generateTokens().hashedRefreshToken),
    getHashedPassword: jest.fn().mockResolvedValue(generateUser().password),
});
