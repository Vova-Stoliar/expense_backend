import { libs } from './lib';

describe('ValidateUserPassword', () => {
    const { getAcceptValue, getReturnValue } = libs.transform();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { validateUserPassword } = await libs.getMocks();

        expect(validateUserPassword).toBeDefined();
    });

    describe('when "password" is valid', () => {
        it(`should return a "user's" "password", "email" and "id"`, async () => {
            const { validateUserPassword, compare } = await libs.getMocks();

            const { acceptValue } = getAcceptValue();
            const { returnValue } = getReturnValue();

            compare.mockImplementation(() => {
                return Promise.resolve(true);
            });

            expect(await validateUserPassword.transform(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('when "password" is not valid', () => {
        it('should throw an error', async () => {
            const { validateUserPassword, compare } = await libs.getMocks();

            const { acceptValue } = getAcceptValue();

            compare.mockImplementation(() => {
                return Promise.resolve(false);
            });

            await expect(validateUserPassword.transform(acceptValue)).rejects.toThrow();
        });
    });
});
