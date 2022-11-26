import bcrypt from 'bcrypt';
import { UserRepositoryHelper } from '~/modules/auth/helpers/classes/user-repository.helper';
import { validateRefreshToken } from '~/modules/auth/lib';
import { getTokens, getUser } from '~/modules/auth/test/stubs';
import type { Tokens } from '~/shared/types';

const getMocks = () => {
    const compare = jest.spyOn(bcrypt, 'compare');

    return { compare };
};

describe('UserRepositoryHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        expect(validateRefreshToken).toBeDefined();
    });

    describe('validateRefreshToken', () => {
        describe('when "refresh token" is not valid', () => {
            it('should throw error', async () => {
                const { compare } = getMocks();

                compare.mockImplementation(() => Promise.resolve(false));

                const passedValue: { hashedRefreshToken: Tokens['refreshToken'] } & Pick<Tokens, 'refreshToken'> = {
                    hashedRefreshToken: getUser().hashedRefreshToken,
                    refreshToken: getTokens().refreshToken,
                };

                await expect(validateRefreshToken(passedValue)).rejects.toThrow();
            });
        });
        describe('when "refresh token" is valid', () => {
            it('should return void', async () => {
                const { compare } = getMocks();

                compare.mockImplementation(() => Promise.resolve(true));

                const passedValue: { hashedRefreshToken: Tokens['refreshToken'] } & Pick<Tokens, 'refreshToken'> = {
                    hashedRefreshToken: getUser().hashedRefreshToken,
                    refreshToken: getTokens().refreshToken,
                };

                await expect(validateRefreshToken(passedValue)).resolves.not.toThrow();
            });
        });
    });
});
