import { Test } from '@nestjs/testing';
import { dateTime, generateTokens } from '~/modules/auth/constants/test';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { getBcryptHelperMock } from '~/modules/auth/helpers/classes/bcrypt-helper/mock';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { getJwtHelperMock } from '~/modules/auth/helpers/classes/jwt-helper/mock';
import { generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib/get-mock-by-token.lib';
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
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { authFacadeHelper, userRepository };
};

describe('AuthFacadeHelper', () => {
    it('should be defined', async () => {
        const { authFacadeHelper } = await getMocks();

        expect(authFacadeHelper).toBeDefined();
    });

    describe('getTokens', () => {
        it('should return "refresh", "access" tokens and "createdAt"', async () => {
            const { authFacadeHelper } = await getMocks();
            const { email, id } = generateUser();
            const { refreshToken, accessToken } = generateTokens();

            const returnValue = { refreshToken, accessToken, createdAt: dateTime };

            const acceptValue = { id, email };

            expect(await authFacadeHelper.getTokens(acceptValue)).toEqual(returnValue);
        });
    });

    describe('getHashedPassword', () => {
        it('should return "refresh", "access" tokens and "createdAt"', async () => {
            const { authFacadeHelper } = await getMocks();
            const { password } = generateUser();

            expect(await authFacadeHelper.getHashedPassword({ password })).toBe(password);
        });
    });

    describe('updateUser', () => {
        it('should return "user"', async () => {
            const { authFacadeHelper, userRepository } = await getMocks();
            const { id, password, displayName, userName, email } = generateUser();

            const returnValue = { id, displayName, userName, email };
            const acceptValue = { password, refreshTokenUpdatedAt: new Date(dateTime), id };

            jest.spyOn(userRepository, 'update').mockResolvedValue(returnValue);

            expect(await authFacadeHelper.updateUser(acceptValue)).toEqual(returnValue);
        });
    });

    describe('createUser', () => {
        it('should return a "user"', async () => {
            const { authFacadeHelper, userRepository } = await getMocks();
            const { email, userName, displayName, id, password } = generateUser();

            const returnValue = { email, id, userName, displayName };
            const acceptValue = { email, userName, displayName, password };

            jest.spyOn(userRepository, 'create').mockResolvedValue(returnValue);

            expect(await authFacadeHelper.createUser(acceptValue)).toEqual(returnValue);
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
