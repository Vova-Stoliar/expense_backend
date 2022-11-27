import { getUser } from '~/modules/auth/constants/test';

export const getBcryptHelperMock = () => ({
    getHashedRefreshToken: jest.fn().mockResolvedValue(getUser().hashedRefreshToken),
    getHashedPassword: jest.fn().mockResolvedValue(getUser().password),
});
