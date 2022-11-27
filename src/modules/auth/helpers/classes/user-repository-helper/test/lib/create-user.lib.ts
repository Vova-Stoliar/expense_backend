import { getUser } from '~/modules/auth/constants/test';
import type { BaseUserWith } from '~/shared/types';

const getReturnValue = () => {
    const { email, userName, displayName, id } = getUser();

    const returnValue = {
        email,
        id,
        userName,
        displayName,
    };

    return { returnValue };
};

const getAcceptValue = () => {
    const { email, userName, displayName, password } = getUser();

    const acceptValue: Omit<BaseUserWith<'password'>, 'id'> = {
        email,
        userName,
        displayName,
        password,
    };

    return { acceptValue };
};

export const createUser = () => {
    return {
        getAcceptValue,
        getReturnValue,
    };
};
