import { libs } from './lib';

describe('ValidateUserExistence', () => {
    const { getReturnValue, getAcceptValue } = libs.transform();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { validateUserExistence } = await libs.getMocks();

        expect(validateUserExistence).toBeDefined();
    });

    describe('ValidateUserExistence', () => {
        describe('when a user is found', () => {
            it('should return a user and payload', async () => {
                const { validateUserExistence, userRepository } = await libs.getMocks();

                const { acceptValue } = getAcceptValue();
                const { returnValue } = getReturnValue();

                jest.spyOn(userRepository, 'findFirstOrThrow').mockResolvedValue(returnValue.user);

                expect(await validateUserExistence.transform(acceptValue)).toStrictEqual(returnValue);
            });
        });

        describe('when a user is not found', () => {
            it('should throw error', async () => {
                const { validateUserExistence, userRepository } = await libs.getMocks();

                const { acceptValue } = getAcceptValue();

                jest.spyOn(userRepository, 'findFirstOrThrow').mockImplementation(() => {
                    throw new TypeError();
                });

                await expect(() => validateUserExistence.transform(acceptValue)).rejects.toThrow(TypeError);
            });
        });
    });
});
