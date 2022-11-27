import { getAuthTokens } from '~/modules/auth/constants/test';

const getAcceptValue = () => {
    const acceptValue = {
        refreshToken: getAuthTokens().refreshToken,
    };

    return { acceptValue };
};

const getReturnValue = () => {
    const returnValue = {
        refreshToken: getAuthTokens().refreshToken,
    };

    return { returnValue };
};

export const transform = () => {
    return { getAcceptValue, getReturnValue };
};
