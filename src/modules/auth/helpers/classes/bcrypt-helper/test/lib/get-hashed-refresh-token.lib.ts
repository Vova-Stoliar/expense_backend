import { generateTokens } from '~/modules/auth/constants/test';

const getAcceptValue = () => {
    const { refreshToken } = generateTokens();

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
