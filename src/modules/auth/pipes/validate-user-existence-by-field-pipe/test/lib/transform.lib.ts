import type { ArgumentMetadata } from '@nestjs/common';
import { getUser } from '~/modules/auth/constants/test';
import type { BaseUser, BaseUserWith } from '~/shared/types';

const getAcceptValue = () => {
    const value = getUser().email;
    const metadata: ArgumentMetadata = {
        type: 'body',
        data: 'email',
    };

    const acceptValue = {
        value,
        metadata,
    };

    return { acceptValue };
};

const getReturnValue = () => {
    const { userName, displayName, id, email } = getUser();

    const returnValue: BaseUser = {
        userName,
        displayName,
        id,
        email,
    };

    return { returnValue };
};

export const transform = () => {
    return { getAcceptValue, getReturnValue };
};
