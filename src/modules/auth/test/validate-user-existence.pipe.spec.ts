import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { ValidateUserExistence } from '~/modules/auth/pipes';
import { getUser } from '~/modules/auth/test/stubs';
import type { IUserToLoginDto, WithPayload } from '~/modules/auth/types';
import { UserRepository } from '~/repositories/user';
import type { BaseUserWith } from '~/shared/types';

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [ValidateUserExistence],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
            }
        })
        .compile();

    const validateUserExistence = moduleRef.get<ValidateUserExistence>(ValidateUserExistence);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { validateUserExistence, userRepository };
};

describe('ValidateUserExistence', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { validateUserExistence } = await getMocks();

        expect(validateUserExistence).toBeDefined();
    });

    describe('ValidateUserExistence', () => {
        describe('when a user is found', () => {
            it('should return a user and payload', async () => {
                const { validateUserExistence, userRepository } = await getMocks();

                const { userName, displayName, id, email, password, hashedRefreshToken } = getUser();

                const user: BaseUserWith<'password'> = {
                    password: hashedRefreshToken,
                    userName,
                    displayName,
                    id,
                    email,
                };

                const passedValue: Pick<IUserToLoginDto, 'email' | 'password'> = {
                    email,
                    password,
                };

                const returnValue: { user: BaseUserWith<'password'> } & WithPayload<Pick<IUserToLoginDto, 'email'>> = {
                    user,
                    payload: passedValue,
                };

                jest.spyOn(userRepository, 'findFirstOrThrow').mockResolvedValue(user);

                expect(await validateUserExistence.transform(passedValue)).toStrictEqual(returnValue);
            });
        });

        describe('when a user is not found', () => {
            it('should throw error', async () => {
                const { validateUserExistence, userRepository } = await getMocks();
                const { email, password } = getUser();

                const passedValue: Pick<IUserToLoginDto, 'email' | 'password'> = {
                    email,
                    password,
                };

                jest.spyOn(userRepository, 'findFirstOrThrow').mockImplementation(() => {
                    throw new TypeError();
                });

                await expect(() => validateUserExistence.transform(passedValue)).rejects.toThrow(TypeError);
            });
        });
    });
});
