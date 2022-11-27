import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

const getReturnValue = () => {
    const { hashedRefreshToken } = getUser();

    const returnValue = {
        hashedRefreshToken,
    };

    return { returnValue };
};

const getAcceptValue = () => {
    const { refreshToken } = getAuthTokens();

    const acceptValue = { refreshToken };

    return { acceptValue };
};

export const getHashedRefreshToken = () => {
    return { getAcceptValue, getReturnValue };
};
