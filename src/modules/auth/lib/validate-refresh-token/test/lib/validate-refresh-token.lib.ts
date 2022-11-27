import { getAuthTokens, getUser } from '~/modules/auth/constants/test';

const getAcceptValue = () => {
    const { hashedRefreshToken } = getUser();
    const { refreshToken } = getAuthTokens();

    const acceptValue = {
        hashedRefreshToken,
        refreshToken,
    };

    return { acceptValue };
};

export function validateRefreshToken() {
    return { getAcceptValue };
}
