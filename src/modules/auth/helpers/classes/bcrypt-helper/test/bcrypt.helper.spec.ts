import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { getMockByToken } from '~/shared/lib';

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

    const hash = jest.spyOn(bcrypt, 'hash');

    return { bcryptHelper, hash };
};

describe('BcryptHelper', () => {
    it('should be defined', async () => {
        const { bcryptHelper } = await getMocks();

        expect(bcryptHelper).toBeDefined();
    });

    describe('getHashedRefreshToken', () => {
        it('should return "hashedRefreshToken"', async () => {
            const { bcryptHelper, hash } = await getMocks();
            const { refreshToken, hashedRefreshToken } = generateTokens();

            const returnValue = hashedRefreshToken;
            const acceptValue = { refreshToken };

            hash.mockImplementation(() => hashedRefreshToken);

            expect(await bcryptHelper.getHashedRefreshToken(acceptValue)).toBe(returnValue);
        });
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
});
