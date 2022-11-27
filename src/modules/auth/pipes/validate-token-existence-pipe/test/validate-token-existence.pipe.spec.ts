import { libs } from './lib';

describe('ValidateTokenExistence', () => {
    const { getReturnValue, getAcceptValue } = libs.transform();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { validateTokenExistence } = await libs.getMocks();

        expect(validateTokenExistence).toBeDefined();
    });

    describe('when token is passed', () => {
        it('should return "token"', async () => {
            const { validateTokenExistence } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(validateTokenExistence.transform(acceptValue.refreshToken)).toBe(returnValue.refreshToken);
        });
    });

    describe('when token is not passed', () => {
        it('should throw error', async () => {
            const { validateTokenExistence } = await libs.getMocks();

            jest.spyOn(validateTokenExistence, 'transform').mockImplementation(() => {
                throw new TypeError();
            });

            expect(() => validateTokenExistence.transform()).toThrow(TypeError);
        });
    });
});
