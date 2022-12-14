import { generateUser } from '~/shared/constants/test';

export const getBcryptHelperMock = () => {
    const { password, id, email, displayName, userName } = generateUser();

    return {
        getHashedPassword: jest.fn().mockResolvedValue(password),
        validateUserPassword: jest.fn().mockResolvedValue({ password, id, email, displayName, userName }),
    };
};
