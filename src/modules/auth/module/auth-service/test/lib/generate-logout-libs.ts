import { generateUser } from '~/modules/auth/constants/test';

const getLogoutAcceptValue = () => {
    return { acceptValue: { id: generateUser().id } };
};

export const generateLogoutLibs = () => {
    return { getLogoutAcceptValue };
};
