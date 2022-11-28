import type { User } from '@prisma/client';
import { getAuthTokens, getUser } from '~/modules/auth/constants/test';
import type { BaseUser, Tokens } from '~/shared/types';

const getAcceptValue = () => {
    const { email, password, id } = getUser();

    const acceptValue: Pick<User, 'email' | 'id' | 'password'> & { confirmPassword: User['password'] } = {
        email,
        id,
        password,
        confirmPassword: password,
    };

    return { acceptValue };
};

const getReturnValue = () => {
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

export const resetPassword = () => {
    return { getReturnValue, getAcceptValue };
};
