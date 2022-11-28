import { generateTokens, generateUser } from '~/modules/auth/constants/test';

const getReturnValue = () => {
    return { returnValue: generateTokens() };
};

const getAcceptValue = () => {
    const { id, email } = generateUser();

    return { acceptValue: { id, email } };
};

export const getTokens = () => {
    return {
        getAcceptValue,
        getReturnValue,
    };
};
