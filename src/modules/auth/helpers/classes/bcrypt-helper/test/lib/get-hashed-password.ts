import { generateUser } from '~/modules/auth/constants/test';

const getAcceptValue = () => {
    const { password } = generateUser();

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
