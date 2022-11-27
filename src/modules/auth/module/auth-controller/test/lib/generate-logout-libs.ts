import { getUser } from '~/modules/auth/constants/test';

const getLogoutAcceptValue = () => {
    return { acceptValue: getUser().id };
};

export const generateLogoutLibs = () => {
    return { getLogoutAcceptValue };
};
