import { getUser } from '~/modules/auth/constants/test';

export const getUserRepositoryHelperMock = () => {
    const { email, userName, displayName, id } = getUser();

    const baseUser = {
        email,
        userName,
        displayName,
        id,
    };

    return {
        createUser: jest.fn().mockResolvedValue(baseUser),
        updateUser: jest.fn().mockResolvedValue(baseUser),
    };
};
