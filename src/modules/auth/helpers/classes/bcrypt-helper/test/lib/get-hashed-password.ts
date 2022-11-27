import { getUser } from '~/modules/auth/test/stubs';

const getAcceptValue = () => {
    const { password } = getUser();

    const acceptValue = { password };

    return { acceptValue };
};

const getReturnValue = () => {
    const returnValue = { hashedPassword: 'ewqsacxzafetq' };

    return { returnValue };
};

export const getHashedPassword = () => {
    return { getReturnValue, getAcceptValue };
};
