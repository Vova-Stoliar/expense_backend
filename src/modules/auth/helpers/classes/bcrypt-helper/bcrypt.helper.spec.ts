import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { generateTokens } from '~/modules/auth/constants/test';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { generateUser } from '~/shared/constants/test';
import { getMockByToken } from '~/shared/lib';
import { UserRepository } from '~/shared/repositories/user';

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [BcryptHelper],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const bcryptHelper = moduleRef.get<BcryptHelper>(BcryptHelper);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    const hash = jest.spyOn(bcrypt, 'hash');
    const compare = jest.spyOn(bcrypt, 'compare');

    return { bcryptHelper, hash, compare, userRepository };
};

describe('BcryptHelper', () => {
    it('should be defined', async () => {
        const { bcryptHelper } = await getMocks();

        expect(bcryptHelper).toBeDefined();
    });

    describe('getHashedPassword', () => {
        it('should return "hashedPassword"', async () => {
            const { bcryptHelper, hash } = await getMocks();
            const { password } = generateUser();

            const acceptValue = { password };
            const returnValue = 'ewqsacxzafetq';

            hash.mockImplementation(() => returnValue);

            expect(await bcryptHelper.getHashedPassword(acceptValue)).toBe(returnValue);
        });
    });

    describe('validateUserPassword', () => {
        describe('when user is found', () => {
            describe('and when password is valid', () => {
                it('should return "user"', async () => {
                    const { bcryptHelper, compare, userRepository } = await getMocks();
                    const { id, password, displayName, userName, email } = generateUser();

                    const acceptValue = { email, password };
                    const returnValue = { id, displayName, userName, email };

                    jest.spyOn(userRepository, 'findUniqueOrThrow').mockResolvedValueOnce({
                        id,
                        displayName,
                        userName,
                        email,
                    });

                    jest.spyOn(userRepository, 'findUniqueOrThrow');

                    compare.mockImplementation(() => Promise.resolve(true));

                    expect(await bcryptHelper.validateUserPassword(acceptValue)).toEqual(returnValue);
                });
            });

            describe('and when password is not valid', () => {
                it('should throw error', async () => {
                    const { bcryptHelper, compare, userRepository } = await getMocks();
                    const { id, password, displayName, userName, email } = generateUser();

                    const acceptValue = { email, password };

                    jest.spyOn(userRepository, 'findUniqueOrThrow').mockResolvedValueOnce({
                        id,
                        displayName,
                        userName,
                        email,
                    });

                    compare.mockImplementation(() => Promise.resolve(false));

                    jest.spyOn(bcryptHelper, 'validateUserPassword').mockImplementation(async () => {
                        throw new TypeError();
                    });

                    await expect(bcryptHelper.validateUserPassword(acceptValue)).rejects.toThrow(TypeError);
                });
            });
        });

        describe('when user is not found', () => {
            it('should throw error', async () => {
                const { userRepository, bcryptHelper } = await getMocks();
                const { password, email } = generateUser();

                const acceptValue = { email, password };

                jest.spyOn(userRepository, 'findUniqueOrThrow').mockImplementation(() => {
                    throw new TypeError();
                });

                await expect(bcryptHelper.validateUserPassword(acceptValue)).rejects.toThrow(TypeError);
            });
        });
    });
});
