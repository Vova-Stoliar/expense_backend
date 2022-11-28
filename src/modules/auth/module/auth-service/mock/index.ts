import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

export const getAuthServiceMock = () => {
    const { email, userName, displayName, id } = getUser();

    const baseUser = { email, userName, displayName, id };

    return {
        login: jest.fn().mockResolvedValue({
            ...getAuthTokens(),
            user: {
                email: getUser().email,
                id: getUser().id,
            },
        }),
        refresh: jest.fn().mockResolvedValue(getAuthTokens()),
        signup: jest.fn().mockResolvedValue({
            ...getAuthTokens(),
            user: baseUser,
        }),
        logout: jest.fn().mockResolvedValue(void 0),
        resetPassword: jest.fn().mockResolvedValue({
            ...getAuthTokens(),
            user: baseUser,
        }),
    };
};
