import { getAuthTokens } from '~/modules/auth/constants/test';

const getAcceptValue = () => {
    const { refreshToken } = getAuthTokens();

    const acceptValue = { refreshToken };

    return { acceptValue };
};

const getReturnValue = () => {
    const returnValue = {};

    return { returnValue };
};

export const getHashedRefreshToken = () => {
    return { getReturnValue, getAcceptValue };
};
