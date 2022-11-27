import { getUser, getAuthTokens } from '~/modules/auth/test/stubs';
import type { IUserToLoginDto } from '~/modules/auth/types';
import type { BaseUser, Tokens } from '~/shared/types';

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
    const { email, id } = getUser();

    const returnValue: { user: Pick<BaseUser, 'email' | 'id'> } & Tokens = {
        user: {
            id,
            email,
        },
        ...getAuthTokens(),
    };

    return { returnValue };
};

export const generateLoginLibs = () => {
    return { getLoginReturnValue, getLoginAcceptValue };
};
