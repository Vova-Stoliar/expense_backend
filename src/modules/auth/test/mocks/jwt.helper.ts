import { getTokens } from '~/modules/auth/test/stubs';

export const getJwtHelperMock = () => ({
    getTokens: jest.fn().mockResolvedValue(getTokens()),
});
