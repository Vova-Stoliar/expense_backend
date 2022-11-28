import type { User } from '@prisma/client';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import type { BaseUser, Tokens } from '~/shared/types';

const getAcceptValue = () => {
    const { email, password, id } = generateUser();

    const acceptValue: Pick<User, 'email' | 'id' | 'password'> & { confirmPassword: User['password'] } = {
        email,
        id,
        password,
        confirmPassword: password,
    };

    return { acceptValue };
};

const getReturnValue = () => {
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

export const resetPassword = () => {
    return { getReturnValue, getAcceptValue };
};
