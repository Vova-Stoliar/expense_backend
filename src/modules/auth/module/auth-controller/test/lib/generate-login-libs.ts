import { getAuthTokens, getUser } from '~/modules/auth/constants/test';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';

const getLoginAcceptValue = () => {
    const { email, id, password } = getUser();

    const acceptValue: Pick<BaseUserWith<'password'>, 'email' | 'id' | 'password'> = {
        email,
        id,
        password,
    };

    return { acceptValue };
};

const getLoginReturnValue = () => {
    const { email, id } = getUser();

    const returnValue: { user: Pick<BaseUser, 'email' | 'id'> } & Tokens = {
        user: {
            id,
            email,
        },
        ...getAuthTokens(),
    };

    return { returnValue };
};

export const generateLoginLibs = () => {
    return { getLoginReturnValue, getLoginAcceptValue };
};
