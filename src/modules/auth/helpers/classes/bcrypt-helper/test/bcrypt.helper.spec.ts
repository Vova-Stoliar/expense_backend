import { getUser } from '~/modules/auth/constants/test';
import { libs } from './lib';

describe('BcryptHelper', () => {
    it('should be defined', async () => {
        const { bcryptHelper } = await libs.getMocks();

        expect(bcryptHelper).toBeDefined();
    });

    describe('getHashedRefreshToken', () => {
        const { getReturnValue, getAcceptValue } = libs.getHashedRefreshToken();

        it('should return "hashedRefreshToken"', async () => {
            const { bcryptHelper, hash } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            hash.mockImplementation(() => getUser().hashedRefreshToken);

            expect(await bcryptHelper.getHashedRefreshToken(acceptValue)).toBe(returnValue);
        });
    });

    describe('getHashedPassword', () => {
        const { getReturnValue, getAcceptValue } = libs.getHashedPassword();

        it('should return "hashedPassword"', async () => {
            const { bcryptHelper, hash } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            hash.mockImplementation(() => returnValue.hashedPassword);

            expect(await bcryptHelper.getHashedPassword(acceptValue)).toBe(returnValue.hashedPassword);
        });
    });
});
