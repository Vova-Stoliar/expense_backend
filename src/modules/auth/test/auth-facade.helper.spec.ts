import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade.helper';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt.helper';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt.helper';
import { RefreshTokenHelper } from '~/modules/auth/helpers/classes/refresh-token.helper';
import { UserRepositoryHelper } from '~/modules/auth/helpers/classes/user-repository.helper';
import { getBcryptHelperMock, getJwtHelperMock, getUserRepositoryHelperMock } from '~/modules/auth/test/mocks';
import { getRefreshTokenHelperMock } from '~/modules/auth/test/mocks/refresh-token.helper';
import {
    getPrismaBatchPayload,
    getCreateUserReturnValue,
    getTokens,
    getUpdateHashedRefreshTokenByIdReturnValue,
    getUser,
} from '~/modules/auth/test/stubs';
import type { BaseUserWith } from '~/shared/types';

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [AuthFacadeHelper],
    })
        .useMocker((token) => {
            if (token === RefreshTokenHelper) return getRefreshTokenHelperMock();

            if (token === UserRepositoryHelper) return getUserRepositoryHelperMock();

            if (token === BcryptHelper) return getBcryptHelperMock();

            if (token === JwtHelper) return getJwtHelperMock();

            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
            }
        })
        .compile();

    const authFacadeHelper = moduleRef.get<AuthFacadeHelper>(AuthFacadeHelper);

    return { authFacadeHelper };
};

describe('AuthFacadeHelper', () => {
    it('should be defined', async () => {
        const { authFacadeHelper } = await getMocks();

        expect(authFacadeHelper).toBeDefined();
    });

    describe('deleteRefreshTokenById', () => {
        // TODO check what it should return
        it('should return "prisma batch payload - { count: 0 }"', async () => {
            const { authFacadeHelper } = await getMocks();

            expect(await authFacadeHelper.deleteRefreshTokenById({ id: getUser().id })).toStrictEqual(
                getPrismaBatchPayload()
            );
        });
    });

    describe('getTokens', () => {
        it('should return "refresh" and "access" tokens', async () => {
            const { authFacadeHelper } = await getMocks();

            expect(await authFacadeHelper.getTokens({ id: getUser().id, email: getUser().email })).toStrictEqual(
                getTokens()
            );
        });
    });

    describe('createUser', () => {
        it('should return a "user"', async () => {
            const { authFacadeHelper } = await getMocks();

            const userToCreate: Omit<BaseUserWith<'password'>, 'id'> = {
                email: getUser().email,
                userName: getUser().userName,
                displayName: getUser().displayName,
                password: getUser().password,
            };

            expect(await authFacadeHelper.createUser(userToCreate)).toStrictEqual(getCreateUserReturnValue());
        });
    });

    describe('getHashedRefreshToken', () => {
        it('should return a "hashed refresh token"', async () => {
            const { authFacadeHelper } = await getMocks();

            expect(await authFacadeHelper.getHashedRefreshToken({ refreshToken: getTokens().refreshToken })).toBe(
                getUser().hashedRefreshToken
            );
        });
    });

    describe('updateHashedRefreshTokenById', () => {
        it('should return a "user"', async () => {
            const { authFacadeHelper } = await getMocks();

            expect(
                await authFacadeHelper.updateHashedRefreshTokenById({
                    hashedRefreshToken: getUser().hashedRefreshToken,
                    id: getUser().id,
                })
            ).toStrictEqual(getUpdateHashedRefreshTokenByIdReturnValue());
        });
    });
});
