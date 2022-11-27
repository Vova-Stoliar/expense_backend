import type { User } from '@prisma/client';
import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

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
    const { id } = getUser();

    return { returnValue: { id, ...getAuthTokens() } };
};

export const resetPassword = () => {
    return { getReturnValue, getAcceptValue };
};
