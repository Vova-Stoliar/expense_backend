import { getUser } from '~/modules/auth/constants/test';
import type { WithPayload } from '~/modules/auth/types';
import type { BaseUser, BaseUserWith } from '~/shared/types';

const getAcceptValue = () => {
    const { email, password } = getUser();

    const acceptValue: Pick<BaseUserWith<'password'>, 'email' | 'password'> = {
        email,
        password,
    };
    return { acceptValue };
};

const getReturnValue = () => {
    const { userName, displayName, id, email, hashedRefreshToken } = getUser();

    const user: BaseUserWith<'password'> = {
        password: hashedRefreshToken,
        userName,
        displayName,
        id,
        email,
    };

    const returnValue: { user: BaseUserWith<'password'> } & WithPayload<Pick<BaseUser, 'email'>> = {
        user,
        payload: getAcceptValue().acceptValue,
    };
    return { returnValue };
};

export const transform = () => {
    return { getAcceptValue, getReturnValue };
};
