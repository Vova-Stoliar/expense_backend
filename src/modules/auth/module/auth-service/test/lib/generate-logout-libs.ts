import { getUser } from '~/modules/auth/test/stubs';

const getLogoutAcceptValue = () => {
    return { acceptValue: { id: getUser().id } };
};

export const generateLogoutLibs = () => {
    return { getLogoutAcceptValue };
};
