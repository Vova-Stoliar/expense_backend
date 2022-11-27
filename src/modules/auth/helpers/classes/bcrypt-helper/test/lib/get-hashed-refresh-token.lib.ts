import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

const getAcceptValue = () => {
    const { refreshToken } = getAuthTokens();

    const acceptValue = { refreshToken };

    return { acceptValue };
};

const getReturnValue = () => {
    const { hashedRefreshToken } = getUser();

    const returnValue = { hashedRefreshToken };

    return { returnValue };
};

export const getHashedRefreshToken = () => {
    return { getReturnValue, getAcceptValue };
};
