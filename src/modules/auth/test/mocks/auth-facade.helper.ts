import {
    getPrismaBatchPayload,
    getCreateUserReturnValue,
    getTokens,
    getUpdateHashedRefreshTokenByIdReturnValue,
    getUser,
} from '~/modules/auth/test/stubs';

export const getAuthFacadeHelperMock = () => ({
    getHashedRefreshToken: jest.fn().mockResolvedValue(getUser().hashedRefreshToken),
    getTokens: jest.fn().mockResolvedValue(getTokens()),
    updateHashedRefreshTokenById: jest.fn().mockResolvedValue(getUpdateHashedRefreshTokenByIdReturnValue()),
    deleteRefreshTokenById: jest.fn().mockResolvedValue(getPrismaBatchPayload()),
    createUser: jest.fn().mockResolvedValue(getCreateUserReturnValue()),
});
