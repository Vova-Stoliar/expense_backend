import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt.helper';
import { getTokens, getUser } from '~/modules/auth/test/stubs';

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [BcryptHelper],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
            }
        })
        .compile();

    const bcryptHelper = moduleRef.get<BcryptHelper>(BcryptHelper);

    return { bcryptHelper };
};

describe('BcryptHelper', () => {
    it('should be defined', async () => {
        const { bcryptHelper } = await getMocks();

        expect(bcryptHelper).toBeDefined();
    });

    describe('getHashedRefreshToken', () => {
        it('should return "hashedRefreshToken"', async () => {
            const { bcryptHelper } = await getMocks();

            jest.spyOn(bcrypt, 'hash').mockImplementation(() => getUser().hashedRefreshToken);

            expect(await bcryptHelper.getHashedRefreshToken({ refreshToken: getTokens().refreshToken })).toBe(
                getUser().hashedRefreshToken
            );
        });
    });

    describe('getHashedPassword', () => {
        it('should return "hashedPassword"', async () => {
            const { bcryptHelper } = await getMocks();

            const hashedPassword = 'ewqsacxzafetq';

            jest.spyOn(bcrypt, 'hash').mockImplementation(() => hashedPassword);

            expect(await bcryptHelper.getHashedPassword({ password: getUser().password })).toBe(hashedPassword);
        });
    });
});
