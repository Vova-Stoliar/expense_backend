import { Test } from '@nestjs/testing';
import { dateTime, generatePrismaBatchPayload, generateTokens, generateUser } from '~/modules/auth/constants/test';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { getBcryptHelperMock } from '~/modules/auth/helpers/classes/bcrypt-helper/mock';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { getJwtHelperMock } from '~/modules/auth/helpers/classes/jwt-helper/mock';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';
import { TokenRepository } from '~/shared/repositories/token';
import { UserRepository } from '~/shared/repositories/user';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [AuthFacadeHelper],
    })
        .useMocker((token) => {
            if (token === BcryptHelper) return getBcryptHelperMock();

            if (token === JwtHelper) return getJwtHelperMock();

            if (typeof token === 'function') return getMockByToken(token);
        })
        .compile();

    const authFacadeHelper = moduleRef.get<AuthFacadeHelper>(AuthFacadeHelper);
    const tokenRepository = moduleRef.get<TokenRepository>(TokenRepository);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { authFacadeHelper, tokenRepository, userRepository };
};

describe('AuthFacadeHelper', () => {
    it('should be defined', async () => {
        const { authFacadeHelper } = await getMocks();

        expect(authFacadeHelper).toBeDefined();
    });

    describe('deleteRefreshToken', () => {
        it('should return "prisma batch payload - { count: 0 }"', async () => {
            const { authFacadeHelper, tokenRepository } = await getMocks();
            const { id } = generateUser();

            const acceptValue = { id };
            const returnValue = generatePrismaBatchPayload();

            jest.spyOn(tokenRepository, 'updateMany').mockResolvedValue(returnValue);

            expect(await authFacadeHelper.deleteRefreshToken(acceptValue)).toEqual(returnValue);
        });
    });

    describe('getTokens', () => {
        it('should return "refresh", "access" tokens and "createdAt"', async () => {
            const { authFacadeHelper } = await getMocks();
            const { email, id } = generateUser();
            const { refreshToken, accessToken } = generateTokens();

            const returnValue = {
                refreshToken,
                accessToken,
                createdAt: dateTime,
            };

            const acceptValue = { id, email };

            expect(await authFacadeHelper.getTokens(acceptValue)).toEqual(returnValue);
        });
    });

    describe('createUser', () => {
        it('should return a "user"', async () => {
            const { authFacadeHelper, userRepository } = await getMocks();
            const { email, userName, displayName, id, password } = generateUser();

            const returnValue = {
                email,
                id,
                userName,
                displayName,
            };

            const acceptValue = {
                email,
                userName,
                displayName,
                password,
            };

            jest.spyOn(userRepository, 'create').mockResolvedValue(returnValue);

            expect(await authFacadeHelper.createUser(acceptValue)).toEqual(returnValue);
        });
    });

    describe('getHashedRefreshToken', () => {
        it('should return a "hashed refresh auth"', async () => {
            const { authFacadeHelper } = await getMocks();
            const { hashedRefreshToken, refreshToken } = generateTokens();

            const returnValue = hashedRefreshToken;
            const acceptValue = { refreshToken };

            expect(await authFacadeHelper.getHashedRefreshToken(acceptValue)).toBe(returnValue);
        });
    });

    describe('updateHashedRefreshToken', () => {
        it('should return a "user"', async () => {
            const { authFacadeHelper, tokenRepository } = await getMocks();

            const { hashedRefreshToken } = generateTokens();
            const { id, updatedAt } = generateUser();

            const acceptValue = {
                hashedRefreshToken,
                userId: id,
                updatedAt,
            };

            const returnValue = {
                userId: id,
            };

            jest.spyOn(tokenRepository, 'update').mockResolvedValue(returnValue);

            expect(await authFacadeHelper.updateHashedRefreshToken(acceptValue)).toEqual(returnValue);
        });
    });

    describe('createRefreshToken', () => {
        it('should return a "user"', async () => {
            const { authFacadeHelper, tokenRepository } = await getMocks();

            const { hashedRefreshToken } = generateTokens();
            const { id, updatedAt } = generateUser();

            const acceptValue = { hashedRefreshToken, userId: id, updatedAt };
            const returnValue = { userId: id };

            jest.spyOn(tokenRepository, 'create').mockResolvedValue(returnValue);

            expect(await authFacadeHelper.createRefreshToken(acceptValue)).toEqual(returnValue);
        });
    });

    describe('updatePassword', () => {
        it('should return a "user"', async () => {
            const { authFacadeHelper, userRepository } = await getMocks();
            const { id, password, displayName, userName, email } = generateUser();

            const acceptValue = { id, password };
            const returnValue = { id, password, displayName, userName, email };

            jest.spyOn(userRepository, 'update').mockResolvedValue(returnValue);

            expect(await authFacadeHelper.updatePassword(acceptValue)).toEqual(returnValue);
        });
    });

    describe('validateUserPassword', () => {
        it('should return a "user"', async () => {
            const { authFacadeHelper } = await getMocks();

            const { id, password, displayName, userName, email } = generateUser();

            const acceptValue = { email, password };
            const returnValue = { id, password, displayName, userName, email };

            expect(await authFacadeHelper.validateUserPassword(acceptValue)).toEqual(returnValue);
        });
    });
});
