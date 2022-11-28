import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

const getAcceptValue = () => {
    const { refreshToken } = getAuthTokens();

    const acceptValue = {
        refreshToken,
    };

    return { acceptValue };
};

export function validateRefreshToken() {
    return { getAcceptValue };
}
