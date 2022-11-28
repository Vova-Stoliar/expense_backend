import { generateTokens, generateUser } from '~/modules/auth/constants/test';

export const getAuthServiceMock = () => {
    const { email, userName, displayName, id } = generateUser();

    const baseUser = { email, userName, displayName, id };

    return {
        login: jest.fn().mockResolvedValue({
            ...generateTokens(),
            user: {
                email: generateUser().email,
                id: generateUser().id,
            },
        }),
        refresh: jest.fn().mockResolvedValue(generateTokens()),
        signup: jest.fn().mockResolvedValue({
            ...generateTokens(),
            user: baseUser,
        }),
        logout: jest.fn().mockResolvedValue(void 0),
        resetPassword: jest.fn().mockResolvedValue({
            ...generateTokens(),
            user: baseUser,
        }),
    };
};
