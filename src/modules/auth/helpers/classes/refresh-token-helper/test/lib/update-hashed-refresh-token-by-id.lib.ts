import { getUser } from '~/modules/auth/test/stubs';
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
    const { hashedRefreshToken, id } = getUser();

    const acceptValue = {
        hashedRefreshToken,
        id,
    };

    return { acceptValue };
};

export const updateHashedRefreshTokenById = () => {
    return { getAcceptValue, getReturnValue };
};
