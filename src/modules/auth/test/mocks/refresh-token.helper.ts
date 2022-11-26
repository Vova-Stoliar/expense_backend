import { getPrismaBatchPayload, getUpdateHashedRefreshTokenByIdReturnValue, getUser } from '~/modules/auth/test/stubs';

export const getRefreshTokenHelperMock = () => ({
    updateHashedRefreshTokenById: jest.fn().mockResolvedValue(getUpdateHashedRefreshTokenByIdReturnValue()),
    deleteRefreshTokenById: jest.fn().mockResolvedValue(getPrismaBatchPayload()),
});
