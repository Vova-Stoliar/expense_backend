import type { User } from '@prisma/client';
import { getUser } from '~/modules/auth/constants/test';
import type { WithPayload } from '~/modules/auth/types';
import type { BaseUserWith } from '~/shared/types';

const getAcceptValue = () => {
    const { userName, displayName, id, email, password, hashedRefreshToken } = getUser();

    const acceptValue: { user: BaseUserWith<'password'> } & WithPayload<Pick<User, 'password' | 'email'>> = {
        user: {
            password: hashedRefreshToken,
            userName,
            displayName,
            id,
            email,
        },
        payload: {
            password,
            email,
        },
    };

    return { acceptValue };
};

const getReturnValue = () => {
    const { id, email, password } = getUser();

    const returnValue: Pick<User, 'password' | 'email' | 'id'> = {
        email,
        password,
        id,
    };

    return { returnValue };
};

export const transform = () => {
    return { getAcceptValue, getReturnValue };
};
