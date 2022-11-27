import { getUser } from '~/modules/auth/constants/test';

const getLogoutAcceptValue = () => {
    return { acceptValue: { id: getUser().id } };
};

export const generateLogoutLibs = () => {
    return { getLogoutAcceptValue };
};
