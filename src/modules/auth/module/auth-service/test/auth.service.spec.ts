import * as libs from './lib';

describe('AuthService', () => {
    it('should be defined', async () => {
        const { authService } = await libs.getMocks();

        expect(authService).toBeDefined();
    });

    describe('resetPassword', () => {
        const { getAcceptValue, getReturnValue } = libs.resetPassword();

        it(`should return a "user's id" and "refreshToken"`, async () => {
            const { authService } = await libs.getMocks();

            const { acceptValue } = getAcceptValue();
            const { returnValue } = getReturnValue();

            expect(await authService.resetPassword(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('signup', () => {
        const { getSignupAcceptValue, getSignupReturnValue } = libs.generateSignupLibs();

        it('should return a "user", "tokens"', async () => {
            const { authService } = await libs.getMocks();

            const { returnValue } = getSignupReturnValue();
            const { acceptValue } = getSignupAcceptValue();

            expect(await authService.signup(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('logout', () => {
        const { getLogoutAcceptValue } = libs.generateLogoutLibs();

        it('should return "void"', async () => {
            const { authService } = await libs.getMocks();

            const { acceptValue } = getLogoutAcceptValue();

            expect(await authService.logout(acceptValue)).toBe(void 0);
        });
    });

    describe('login', () => {
        const { getLoginReturnValue, getLoginAcceptValue } = libs.generateLoginLibs();

        it('should return "access" and "refresh" tokens', async () => {
            const { authService } = await libs.getMocks();

            const { returnValue } = getLoginReturnValue();
            const { acceptValue } = getLoginAcceptValue();

            expect(await authService.login(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('refresh', () => {
        const { getRefreshReturnValue, getRefreshAcceptValue, getRefreshMocks } = libs.generateRefreshLibs();

        it('should return "tokens"', async () => {
            const { authService } = await libs.getMocks();

            const { acceptValue } = getRefreshAcceptValue();
            const { returnValue } = getRefreshReturnValue();
            const { validateRefreshToken } = getRefreshMocks();

            validateRefreshToken.mockImplementation();

            expect(await authService.refresh(acceptValue)).toStrictEqual(returnValue);
        });

        it('should throw error if "refresh token" is not valid', async () => {
            const { authService } = await libs.getMocks();

            const { acceptValue } = getRefreshAcceptValue();
            const { validateRefreshToken } = getRefreshMocks();

            validateRefreshToken.mockImplementation(() => {
                throw new TypeError();
            });

            await expect(() => authService.refresh(acceptValue)).rejects.toThrow(TypeError);
        });
    });
});
