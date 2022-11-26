import { Test } from '@nestjs/testing';
import type { User } from '@prisma/client';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt.helper';
import { RefreshTokenHelper } from '~/modules/auth/helpers/classes/refresh-token.helper';
import { UserRepositoryHelper } from '~/modules/auth/helpers/classes/user-repository.helper';
import { getBcryptHelperMock } from '~/modules/auth/test/mocks';
import { getCreateUserReturnValue, getPrismaBatchPayload, getUser } from '~/modules/auth/test/stubs';
import { UserRepository } from '~/repositories/user';
import type { BaseUser, BaseUserWith } from '~/shared/types';

const getUserRepositoryMock = () => {
    const { displayName, userName, email, id, hashedRefreshToken } = getUser();

    return {
        create: jest.fn().mockResolvedValue({ displayName, userName, email, id }),
    };
};

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [UserRepositoryHelper],
    })
        .useMocker((token) => {
            if (token === BcryptHelper) return getBcryptHelperMock();

            if (token === UserRepository) return getUserRepositoryMock();

            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
            }
        })
        .compile();

    const userRepositoryHelper = moduleRef.get<UserRepositoryHelper>(UserRepositoryHelper);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { userRepositoryHelper, userRepository };
};

describe('UserRepositoryHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { userRepositoryHelper } = await getMocks();

        expect(userRepositoryHelper).toBeDefined();
    });

    describe('createUser', () => {
        it('should return "user"', async () => {
            const { userRepositoryHelper } = await getMocks();
            const { password, userName, displayName, email, id } = getUser();

            const returnValue: BaseUser = {
                email,
                userName,
                displayName,
                id,
            };

            const passedValue: Omit<BaseUserWith<'password'>, 'id'> = {
                email,
                userName,
                displayName,
                password,
            };

            expect(await userRepositoryHelper.createUser(passedValue)).toStrictEqual(returnValue);
        });

        it.todo('should create user with hashed password');
    });
});
