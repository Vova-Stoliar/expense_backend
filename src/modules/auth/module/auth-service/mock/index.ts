import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

export const getAuthServiceMock = () => {
    const { email, userName, displayName, id } = getUser();

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
            user: { email, userName, displayName, id },
        }),
        logout: jest.fn().mockResolvedValue(void 0),
    };
};
