import type { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { ValidateUserExistenceByField } from '~/modules/auth/pipes';
import { getUser } from '~/modules/auth/test/stubs';
import { UserRepository } from '~/repositories/user';
import type { BaseUserWith } from '~/shared/types';

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [ValidateUserExistenceByField],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
            }
        })
        .compile();

    const validateUserExistenceByField = moduleRef.get<ValidateUserExistenceByField>(ValidateUserExistenceByField);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { validateUserExistenceByField, userRepository };
};

describe('ValidateUserExistenceByField', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { validateUserExistenceByField } = await getMocks();

        expect(validateUserExistenceByField).toBeDefined();
    });

    describe('when a "user" is found', () => {
        it('should return user', async () => {
            const { validateUserExistenceByField, userRepository } = await getMocks();

            const { userName, displayName, id, email, hashedRefreshToken } = getUser();

            const user: BaseUserWith<'hashedRefreshToken'> = {
                hashedRefreshToken,
                userName,
                displayName,
                id,
                email,
            };

            const value = getUser().email;

            const metadata: ArgumentMetadata = {
                type: 'body',
                data: 'email',
            };

            jest.spyOn(userRepository, 'findFirstOrThrow').mockResolvedValue(user);

            expect(await validateUserExistenceByField.transform(value, metadata)).toStrictEqual(user);
        });
    });

    describe('when a "user" is not found', () => {
        it('should throw error', async () => {
            const { validateUserExistenceByField, userRepository } = await getMocks();

            const value = getUser().email;

            const metadata: ArgumentMetadata = {
                type: 'body',
                data: 'email',
            };

            jest.spyOn(userRepository, 'findFirstOrThrow').mockImplementation(() => {
                throw new TypeError();
            });

            await expect(validateUserExistenceByField.transform(value, metadata)).rejects.toThrow(TypeError);
        });
    });

    describe('when a "metadata.data" is "undefined"', () => {
        it('should throw error', async () => {
            const { validateUserExistenceByField } = await getMocks();

            const value = getUser().email;

            const metadata: ArgumentMetadata = {
                type: 'body',
            };

            await expect(validateUserExistenceByField.transform(value, metadata)).rejects.toThrow();
        });
    });
});
