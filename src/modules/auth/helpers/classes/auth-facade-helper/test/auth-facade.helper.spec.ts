import { libs } from './lib';

describe('AuthFacadeHelper', () => {
    it('should be defined', async () => {
        const { authFacadeHelper } = await libs.getMocks();

        expect(authFacadeHelper).toBeDefined();
    });

    describe('deleteRefreshTokenById', () => {
        const { getReturnValue, getAcceptValue } = libs.deleteRefreshTokenById();

        it('should return "prisma batch payload - { count: 0 }"', async () => {
            const { authFacadeHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await authFacadeHelper.deleteRefreshTokenById(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('getTokens', () => {
        const { getAcceptValue, getReturnValue } = libs.getTokens();

        it('should return "refresh" and "access" tokens', async () => {
            const { authFacadeHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await authFacadeHelper.getTokens(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('createUser', () => {
        const { getReturnValue, getAcceptValue } = libs.createUser();

        it('should return a "user"', async () => {
            const { authFacadeHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await authFacadeHelper.createUser(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('getHashedRefreshToken', () => {
        const { getAcceptValue, getReturnValue } = libs.getHashedRefreshToken();

        it('should return a "hashed refresh token"', async () => {
            const { authFacadeHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await authFacadeHelper.getHashedRefreshToken(acceptValue)).toBe(returnValue.hashedRefreshToken);
        });
    });

    describe('updateHashedRefreshTokenById', () => {
        const { getAcceptValue, getReturnValue } = libs.updateHashedRefreshTokenById();

        it('should return a "user"', async () => {
            const { authFacadeHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await authFacadeHelper.updateHashedRefreshTokenById(acceptValue)).toStrictEqual(returnValue);
        });
    });
});
