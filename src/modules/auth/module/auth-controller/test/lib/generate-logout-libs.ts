import { getUser } from '~/modules/auth/test/stubs';

const getLogoutAcceptValue = () => {
    return { acceptValue: getUser().id };
};

export const generateLogoutLibs = () => {
    return { getLogoutAcceptValue };
};
