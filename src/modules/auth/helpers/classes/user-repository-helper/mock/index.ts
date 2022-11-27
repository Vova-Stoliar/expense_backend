import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

export const getUserRepositoryHelperMock = () => {
    const { email, userName, displayName, id } = getUser();

    return {
        createUser: jest.fn().mockResolvedValue({
            ...getAuthTokens(),
            user: {
                email,
                userName,
                displayName,
                id,
            },
        }),
    };
};
