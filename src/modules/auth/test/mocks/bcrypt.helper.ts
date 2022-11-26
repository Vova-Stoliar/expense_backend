import { getUser } from '~/modules/auth/test/stubs';

// TODO move mocks to the same directory

export const getBcryptHelperMock = () => ({
    getHashedRefreshToken: jest.fn().mockResolvedValue(getUser().hashedRefreshToken),
    getHashedPassword: jest.fn().mockResolvedValue(getUser().password),
});
