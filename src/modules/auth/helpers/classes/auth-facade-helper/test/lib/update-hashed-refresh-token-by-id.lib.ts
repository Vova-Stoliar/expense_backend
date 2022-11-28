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
    const { id } = getUser();

    const acceptValue = {
        id,
    };

    return { acceptValue };
};

export const updateHashedRefreshTokenById = () => {
    return { getAcceptValue, getReturnValue };
};
