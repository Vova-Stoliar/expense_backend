import { generateUser } from '~/modules/auth/constants/test';
import type { BaseUserWith } from '~/shared/types';

const getReturnValue = () => {
    const { email, userName, displayName, id } = generateUser();

    const returnValue = {
        email,
        id,
        userName,
        displayName,
    };

    return { returnValue };
};

const getAcceptValue = () => {
    const { email, userName, displayName, password } = generateUser();

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
