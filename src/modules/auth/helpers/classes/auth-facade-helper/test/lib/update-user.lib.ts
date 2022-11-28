import type { User } from '@prisma/client';
import { generateUser } from '~/modules/auth/constants/test';
import type { BaseUser } from '~/shared/types';

const getReturnValue = () => {
    const { email, id, userName, displayName } = generateUser();

    const returnValue: BaseUser = {
        email,
        id,
        userName,
        displayName,
    };

    return { returnValue };
};

const getAcceptValue = () => {
    const { id, password } = generateUser();

    const acceptValue = {
        user: {
            password,
        },
        id,
    };

    return { acceptValue };
};

export const updateUser = () => {
    return { getAcceptValue, getReturnValue };
};
