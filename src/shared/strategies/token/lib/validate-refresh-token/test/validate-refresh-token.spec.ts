import { validateRefreshToken } from '~/modules/auth/lib';
import { libs } from './lib';

describe('validateRefreshToken', () => {
    const { getAcceptValue } = libs.validateRefreshToken();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(validateRefreshToken).toBeDefined();
    });

    describe('when "refresh token" is not valid', () => {
        it('should throw error', async () => {
            const { compare } = libs.getMocks();
            const { acceptValue } = getAcceptValue();

            compare.mockImplementation(() => Promise.resolve(false));

            await expect(validateRefreshToken(acceptValue)).rejects.toThrow();
        });
    });

    describe('when "refresh token" is valid', () => {
        it('should return void', async () => {
            const { compare } = libs.getMocks();
            const { acceptValue } = getAcceptValue();

            compare.mockImplementation(() => Promise.resolve(true));

            await expect(validateRefreshToken(acceptValue)).resolves.not.toThrow();
        });
    });
});
