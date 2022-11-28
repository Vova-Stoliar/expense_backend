import type { User } from '@prisma/client';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import type { Tokens } from '~/shared/types';

// TODO rename functions

const getLoginAcceptValue = () => {
    const { email, id, password } = generateUser();

    const acceptValue: Pick<User, 'email' | 'id' | 'password'> = {
        email,
        id,
        password,
    };

    return { acceptValue };
};

const getLoginReturnValue = () => {
    const { email, id } = generateUser();

    const returnValue: { user: Pick<User, 'email' | 'id'> } & Tokens = {
        user: {
            id,
            email,
        },
        ...generateTokens(),
    };

    return { returnValue };
};

export const generateLoginLibs = () => {
    return { getLoginReturnValue, getLoginAcceptValue };
};
