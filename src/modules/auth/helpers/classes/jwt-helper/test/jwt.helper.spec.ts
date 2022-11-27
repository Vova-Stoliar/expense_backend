import { getAuthTokens } from '~/modules/auth/test/stubs';
import { libs } from './lib';

describe('JwtHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { jwtHelper } = await libs.getMocks();

        expect(jwtHelper).toBeDefined();
    });

    describe('getTokens', () => {
        const { getReturnValue, getAcceptValue } = libs.getTokens();

        it('should return "refresh" and "access" tokens', async () => {
            const { jwtHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            jest.spyOn(Promise, 'all').mockResolvedValue([getAuthTokens().accessToken, getAuthTokens().refreshToken]);

            expect(await jwtHelper.getTokens(acceptValue)).toStrictEqual(returnValue);
        });
    });
});
