import bcrypt from 'bcrypt';
import { generateTokens } from '~/modules/auth/constants/test';
import { validateRefreshTokens } from '~/shared/strategies/auth/lib';

const getMocks = () => {
    const compare = jest.spyOn(bcrypt, 'compare');

    return { compare };
};

describe('validateRefreshToken', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(validateRefreshTokens).toBeDefined();
    });

    describe('when "refresh auth" is not valid', () => {
        it('should throw error', async () => {
            const { refreshToken, hashedRefreshToken } = generateTokens();
            const { compare } = getMocks();

            const acceptValue = {
                refreshToken,
                hashedRefreshToken,
            };

            compare.mockImplementation(() => Promise.resolve(false));

            await expect(validateRefreshTokens(acceptValue)).rejects.toThrow();
        });
    });

    describe('when "refresh auth" is valid', () => {
        it('should return void', async () => {
            const { compare } = getMocks();
            const { refreshToken, hashedRefreshToken } = generateTokens();

            const acceptValue = {
                refreshToken,
                hashedRefreshToken,
            };

            compare.mockImplementation(() => Promise.resolve(true));

            await expect(validateRefreshTokens(acceptValue)).resolves.not.toThrow();
        });
    });
});
