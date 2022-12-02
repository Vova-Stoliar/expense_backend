import { generateTokens } from '~/modules/auth/constants/test';
import { generateUser } from '~/shared/constants/test';

export const getBcryptHelperMock = () => {
    const { hashedRefreshToken } = generateTokens();
    const { password, id, email, displayName, userName } = generateUser();

    return {
        getHashedRefreshToken: jest.fn().mockResolvedValue(hashedRefreshToken),
        getHashedPassword: jest.fn().mockResolvedValue(password),
        validateUserPassword: jest.fn().mockResolvedValue({ password, id, email, displayName, userName }),
    };
};
