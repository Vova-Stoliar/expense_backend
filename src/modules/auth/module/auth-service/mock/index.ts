import { getLoginReturnValue, getSignupReturnValue, getAuthTokens } from '~/modules/auth/test/stubs';

export const getAuthServiceMock = () => ({
    login: jest.fn().mockResolvedValue(getLoginReturnValue()),
    refresh: jest.fn().mockResolvedValue(getAuthTokens()),
    signup: jest.fn().mockResolvedValue(getSignupReturnValue()),
    logout: jest.fn().mockResolvedValue(void 0),
});
