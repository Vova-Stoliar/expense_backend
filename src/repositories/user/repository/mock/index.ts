import { getPrismaBatchPayload, getUser } from '~/modules/auth/constants/test';

export const getUserRepositoryMock = () => {
    const { displayName, userName, email, id } = getUser();

    return {
        update: jest.fn().mockResolvedValue({
            email,
            userName,
            displayName,
            id,
        }),
        updateMany: jest.fn().mockResolvedValue(getPrismaBatchPayload()),
        create: jest.fn().mockResolvedValue({ displayName, userName, email, id }),
    };
};
