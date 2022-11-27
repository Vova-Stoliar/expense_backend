import { getPrismaBatchPayload, getUser } from '~/modules/auth/test/stubs';

const getReturnValue = () => {
    return { returnValue: getPrismaBatchPayload() };
};

const getAcceptValue = () => {
    return { acceptValue: { id: getUser().id } };
};

export const deleteRefreshTokenById = () => {
    return {
        getAcceptValue,
        getReturnValue,
    };
};
