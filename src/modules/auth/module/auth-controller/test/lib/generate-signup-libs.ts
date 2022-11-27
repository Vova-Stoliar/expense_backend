import { getAuthTokens, getUser } from '~/modules/auth/constants/test';
import type { IUserUserToSignupDto } from '~/modules/auth/types';
import type { BaseUser, Tokens } from '~/shared/types';

const getSignupAcceptValue = () => {
    const { email, userName, displayName, password } = getUser();

    const acceptValue: IUserUserToSignupDto = {
        email,
        userName,
        displayName,
        password,
        confirmPassword: password,
    };

    return { acceptValue };
};

const getSignupReturnValue = () => {
    const { email, userName, displayName, id } = getUser();

    const returnValue: { user: BaseUser } & Tokens = {
        ...getAuthTokens(),
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
