import { generateTokens, generateUser } from '~/modules/auth/constants/test';

const getAcceptValue = () => {
    const { refreshToken } = generateTokens();

    const acceptValue = {
        refreshToken,
    };

    return { acceptValue };
};

export function validateRefreshToken() {
    return { getAcceptValue };
}
