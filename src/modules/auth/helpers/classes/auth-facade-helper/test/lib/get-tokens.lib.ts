import { getAuthTokens, getUser } from '~/modules/auth/test/stubs';

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
