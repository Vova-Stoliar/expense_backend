import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { ValidateUserPassword } from '~/modules/auth/pipes';
import { getUser } from '~/modules/auth/test/stubs';
import type { IUserToLoginDto, WithPayload } from '~/modules/auth/types';
import type { BaseUserWith } from '~/shared/types';

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [ValidateUserPassword],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
            }
        })
        .compile();

    const validateUserPassword = moduleRef.get<ValidateUserPassword>(ValidateUserPassword);

    return { validateUserPassword };
};

describe('ValidateUserPassword', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { validateUserPassword } = await getMocks();

        expect(validateUserPassword).toBeDefined();
    });

    describe('when "password" is valid', () => {
        it(`should return a "user's" "password", "email" and "id"`, async () => {
            const { validateUserPassword } = await getMocks();
            const { userName, displayName, id, email, password, hashedRefreshToken } = getUser();

            const passedValue: { user: BaseUserWith<'password'> } & WithPayload<
                Pick<IUserToLoginDto, 'password' | 'email'>
            > = {
                user: {
                    password: hashedRefreshToken,
                    userName,
                    displayName,
                    id,
                    email,
                },
                payload: {
                    password,
                    email,
                },
            };

            const returnValue: IUserToLoginDto = {
                email,
                password,
                id,
            };

            jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
                return Promise.resolve(true);
            });

            expect(await validateUserPassword.transform(passedValue)).toStrictEqual(returnValue);
        });
    });

    describe('when "password" is not valid', () => {
        it('should throw an error', async () => {
            const { validateUserPassword } = await getMocks();
            const { userName, displayName, id, email, password, hashedRefreshToken } = getUser();

            const passedValue: { user: BaseUserWith<'password'> } & WithPayload<
                Pick<IUserToLoginDto, 'password' | 'email'>
            > = {
                user: {
                    password: hashedRefreshToken,
                    userName,
                    displayName,
                    id,
                    email,
                },
                payload: {
                    password,
                    email,
                },
            };

            jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
                return Promise.resolve(false);
            });

            await expect(validateUserPassword.transform(passedValue)).rejects.toThrow();
        });
    });
});
