import { Test } from '@nestjs/testing';
import type { User } from '@prisma/client';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { RefreshTokenHelper } from '~/modules/auth/helpers/classes/refresh-token.helper';
import { getPrismaBatchPayload, getUser } from '~/modules/auth/test/stubs';
import { UserRepository } from '~/repositories/user';
import type { BaseUser } from '~/shared/types';

const getUserRepositoryMock = () => ({
    update: jest.fn().mockResolvedValue({
        email: getUser().email,
        userName: getUser().userName,
        displayName: getUser().displayName,
        id: getUser().id,
    }),
    updateMany: jest.fn().mockResolvedValue(getPrismaBatchPayload()),
});

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [RefreshTokenHelper],
    })
        .useMocker((token) => {
            if (token === UserRepository) {
                return getUserRepositoryMock();
            }

            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
            }
        })
        .compile();

    const refreshTokenHelper = moduleRef.get<RefreshTokenHelper>(RefreshTokenHelper);

    return { refreshTokenHelper };
};

describe('RefreshTokenHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { refreshTokenHelper } = await getMocks();

        expect(refreshTokenHelper).toBeDefined();
    });

    describe('updateHashedRefreshTokenById', () => {
        it('should return "user"', async () => {
            const { refreshTokenHelper } = await getMocks();

            const params: Pick<BaseUser, 'id'> & Pick<User, 'hashedRefreshToken'> = {
                hashedRefreshToken: getUser().hashedRefreshToken,
                id: getUser().id,
            };

            const returnValue: BaseUser = {
                email: getUser().email,
                userName: getUser().userName,
                displayName: getUser().displayName,
                id: getUser().id,
            };

            expect(await refreshTokenHelper.updateHashedRefreshTokenById(params)).toStrictEqual(returnValue);
        });
    });

    describe('deleteRefreshTokenById', () => {
        it('should return "prisma batch payload - { count: 0 }"', async () => {
            const { refreshTokenHelper } = await getMocks();

            expect(await refreshTokenHelper.deleteRefreshTokenById({ id: getUser().id })).toStrictEqual(
                getPrismaBatchPayload()
            );
        });
    });
});
