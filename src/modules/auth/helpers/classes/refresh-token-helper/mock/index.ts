import { getPrismaBatchPayload, getUser } from '~/modules/auth/constants/test';

export const getRefreshTokenHelperMock = () => {
    const { email, userName, displayName, id } = getUser();

    return {
        updateHashedRefreshTokenById: jest.fn().mockResolvedValue({
            email,
            id,
            userName,
            displayName,
        }),
        deleteRefreshTokenById: jest.fn().mockResolvedValue(getPrismaBatchPayload()),
    };
};
