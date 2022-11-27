import { libs } from './lib';

describe('RefreshTokenHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { refreshTokenHelper } = await libs.getMocks();

        expect(refreshTokenHelper).toBeDefined();
    });

    describe('updateHashedRefreshTokenById', () => {
        const { getReturnValue, getAcceptValue } = libs.updateHashedRefreshTokenById();

        it('should return "user"', async () => {
            const { refreshTokenHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await refreshTokenHelper.updateHashedRefreshTokenById(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('deleteRefreshTokenById', () => {
        const { getReturnValue, getAcceptValue } = libs.deleteRefreshTokenById();

        it('should return "prisma batch payload - { count: 0 }"', async () => {
            const { refreshTokenHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await refreshTokenHelper.deleteRefreshTokenById(acceptValue)).toStrictEqual(returnValue);
        });
    });
});
