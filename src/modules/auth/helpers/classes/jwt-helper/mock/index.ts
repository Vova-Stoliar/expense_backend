import { generateTokens } from '~/modules/auth/constants/test';

export const getJwtHelperMock = () => ({
    getTokens: jest.fn().mockResolvedValue(generateTokens()),
});
