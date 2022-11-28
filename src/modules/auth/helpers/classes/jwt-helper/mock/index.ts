import { dateTime, generateTokens } from '~/modules/auth/constants/test';

export const getJwtHelperMock = () => {
    return {
        getTokens: jest.fn().mockResolvedValue({ ...generateTokens(), createdAt: dateTime }),
    };
};
