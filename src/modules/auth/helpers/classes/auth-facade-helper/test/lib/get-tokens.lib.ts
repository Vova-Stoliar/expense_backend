import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

const getReturnValue = () => {
    return { returnValue: getAuthTokens() };
};

const getAcceptValue = () => {
    const { id, email } = getUser();

    return { acceptValue: { id, email } };
};

export const getTokens = () => {
    return {
        getAcceptValue,
        getReturnValue,
    };
};
