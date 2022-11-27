import { getUser, getAuthTokens } from '~/modules/auth/test/stubs';
import type { IUserToLoginDto } from '~/modules/auth/types';

const getLoginAcceptValue = () => {
    const { email, id, password } = getUser();

    const acceptValue: IUserToLoginDto = {
        email,
        id,
        password,
    };

    return { acceptValue };
};

const getLoginReturnValue = () => {
    return { returnValue: getAuthTokens() };
};

export const generateLoginLibs = () => {
    return { getLoginReturnValue, getLoginAcceptValue };
};
