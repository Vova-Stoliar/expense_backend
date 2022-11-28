import { generatePrismaBatchPayload, generateUser } from '~/modules/auth/constants/test';

export const getUserRepositoryMock = () => {
    const { displayName, userName, email, id } = generateUser();

    const baseUser = {
        email,
        userName,
        displayName,
        id,
    };

    return {
        update: jest.fn().mockResolvedValue(baseUser),
        updateMany: jest.fn().mockResolvedValue(generatePrismaBatchPayload()),
        create: jest.fn().mockResolvedValue(baseUser),
    };
};
