import { generateTokens } from '~/modules/auth/constants/test';
import * as lib from '~/shared/lib';
import { validateRefreshTokens } from '~/app/strategies/auth/lib';

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

            const acceptValue = {
                refreshToken,
                hashedRefreshToken,
            };

            jest.spyOn(lib, 'validateIsValueDefined').mockImplementation(() => {
                throw new TypeError();
            });

            await expect(validateRefreshTokens(acceptValue)).rejects.toThrow(TypeError);
        });
    });

    describe('when "refresh auth" is valid', () => {
        it('should return void', async () => {
            const { refreshToken, hashedRefreshToken } = generateTokens();

            const acceptValue = {
                refreshToken,
                hashedRefreshToken,
            };

            jest.spyOn(lib, 'validateIsValueDefined').mockImplementation();

            await expect(validateRefreshTokens(acceptValue)).resolves.not.toThrow();
        });
    });
});
