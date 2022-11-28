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
    const { id } = generateUser();

    const acceptValue = {
        id,
    };

    return { acceptValue };
};

export const updateHashedRefreshTokenById = () => {
    return { getAcceptValue, getReturnValue };
};
