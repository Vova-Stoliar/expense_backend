import type { User } from '@prisma/client';
import { getUser } from '~/modules/auth/constants/test';
import type { BaseUser } from '~/shared/types';

const getReturnValue = () => {
    const { email, id, userName, displayName } = getUser();

    const returnValue: BaseUser = {
        email,
        id,
        userName,
        displayName,
    };

    return { returnValue };
};

const getAcceptValue = () => {
    const { id, password } = getUser();

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
