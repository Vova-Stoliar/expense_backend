// TODO get read of this functions

import { getLoginReturnValue, getSignupReturnValue, getTokens } from '~/modules/auth/test/stubs';

export const getAuthServiceMock = () => ({
    login: jest.fn().mockResolvedValue(getLoginReturnValue()),
    refresh: jest.fn().mockResolvedValue(getTokens()),
    signup: jest.fn().mockResolvedValue(getSignupReturnValue()),
    logout: jest.fn().mockResolvedValue(void 0),
});
