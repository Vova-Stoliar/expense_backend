import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import type { BaseUser, Tokens } from '~/shared/types';

const getSignupAcceptValue = () => {
    const { email, userName, displayName, password } = generateUser();

    const acceptValue = {
        email,
        userName,
        displayName,
        password,
        confirmPassword: password,
    };

    return { acceptValue };
};

const getSignupReturnValue = () => {
    const { email, userName, displayName, id } = generateUser();

    const returnValue: { user: BaseUser } & Tokens = {
        ...generateTokens(),
        user: {
            email,
            userName,
            displayName,
            id,
        },
    };

    return { returnValue };
};

export const generateSignupLibs = () => {
    return { getSignupAcceptValue, getSignupReturnValue };
};
