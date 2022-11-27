import { getAuthTokens, getUser } from '~/modules/auth/constants/test';
import type { BaseUserWith } from '~/shared/types';

const getLoginAcceptValue = () => {
    const { email, id, password } = getUser();

    const acceptValue: Pick<BaseUserWith<'password'>, 'password' | 'email' | 'id'> = {
        email,
        id,
        password,
    };

    return { acceptValue };
};

const getLoginReturnValue = () => {
    return { returnValue: getAuthTokens() };
};

export const generateLoginLibs = () => {
    return { getLoginReturnValue, getLoginAcceptValue };
};
