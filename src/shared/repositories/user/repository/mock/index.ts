import { getPrismaBatchPayload, getUser } from '~/modules/auth/constants/test';

export const getUserRepositoryMock = () => {
    const { displayName, userName, email, id } = getUser();

    const baseUser = {
        email,
        userName,
        displayName,
        id,
    };

    return {
        update: jest.fn().mockResolvedValue(baseUser),
        updateMany: jest.fn().mockResolvedValue(getPrismaBatchPayload()),
        create: jest.fn().mockResolvedValue(baseUser),
    };
};
