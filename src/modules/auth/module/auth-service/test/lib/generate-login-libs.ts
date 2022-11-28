import type { User } from '@prisma/client';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import type { BaseUserWith } from '~/shared/types';

const getLoginAcceptValue = () => {
    const { email, id, password } = generateUser();

    const acceptValue: Pick<User, 'password' | 'email' | 'id'> = {
        email,
        id,
        password,
    };

    return { acceptValue };
};

const getLoginReturnValue = () => {
    return { returnValue: generateTokens() };
};

export const generateLoginLibs = () => {
    return { getLoginReturnValue, getLoginAcceptValue };
};
