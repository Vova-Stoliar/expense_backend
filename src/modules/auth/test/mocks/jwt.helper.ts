import { getAuthTokens } from '~/modules/auth/test/stubs';

export const getJwtHelperMock = () => ({
    getTokens: jest.fn().mockResolvedValue(getAuthTokens()),
});
