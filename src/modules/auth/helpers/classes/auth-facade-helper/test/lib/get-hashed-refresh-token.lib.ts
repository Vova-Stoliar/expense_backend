import { getAuthTokens, getUser } from '~/modules/auth/test/stubs';

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
