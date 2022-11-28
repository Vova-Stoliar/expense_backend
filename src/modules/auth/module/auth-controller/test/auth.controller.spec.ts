import * as libs from './lib';

describe('CatsController', () => {
    it('should be defined', async () => {
        const { authController } = await libs.getMocks();

        expect(authController).toBeDefined();
    });

    describe('signup', () => {
        const { getSignupAcceptValue, getSignupReturnValue } = libs.generateSignupLibs();

        it('should return a "user", "refresh" and "access tokens"', async () => {
            const { authController } = await libs.getMocks();

            const { acceptValue } = getSignupAcceptValue();
            const { returnValue } = getSignupReturnValue();

            expect(await authController.signup(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('logout', () => {
        const { getLogoutAcceptValue } = libs.generateLogoutLibs();

        it('should return "void"', async () => {
            const { authController } = await libs.getMocks();

            const { acceptValue } = getLogoutAcceptValue();

            expect(await authController.logout(acceptValue)).toBe(void 0);
        });
    });

    describe('login', () => {
        const { getLoginReturnValue, getLoginAcceptValue } = libs.generateLoginLibs();

        it('should return a "user" and "tokens"', async () => {
            const { authController } = await libs.getMocks();

            const { returnValue } = getLoginReturnValue();
            const { acceptValue } = getLoginAcceptValue();

            expect(await authController.login(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('refresh', () => {
        const { getRefreshReturnValue, getRefreshAcceptValue } = libs.generateRefreshLibs();

        it('should return "tokens"', async () => {
            const { authController } = await libs.getMocks();

            const { acceptValue } = getRefreshAcceptValue();
            const { returnValue } = getRefreshReturnValue();

            expect(await authController.refresh(acceptValue.user, acceptValue.refreshToken)).toStrictEqual(returnValue);
        });
    });

    describe('resetPassword', () => {
        const { getAcceptValue, getReturnValue } = libs.resetPassword();

        it('should return a "user" and "tokens"', async () => {
            const { authController } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await authController.resetPassword(acceptValue)).toStrictEqual(returnValue);
        });
    });
});
