import { generatePrismaBatchPayload, generateUser } from '~/modules/auth/constants/test';

const getReturnValue = () => {
    return { returnValue: generatePrismaBatchPayload() };
};

const getAcceptValue = () => {
    return { acceptValue: { id: generateUser().id } };
};

export const deleteRefreshTokenById = () => {
    return {
        getAcceptValue,
        getReturnValue,
    };
};
