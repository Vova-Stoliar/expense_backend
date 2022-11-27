import { getPrismaBatchPayload, getUser } from '~/modules/auth/test/stubs';

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
    };
};
