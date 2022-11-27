import type { ArgumentMetadata } from '@nestjs/common';
import { libs } from './lib';

describe('ValidateUserExistenceByField', () => {
    const { getReturnValue, getAcceptValue } = libs.transform();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { validateUserExistenceByField } = await libs.getMocks();

        expect(validateUserExistenceByField).toBeDefined();
    });

    describe('when a "user" is found', () => {
        it('should return user', async () => {
            const { validateUserExistenceByField, userRepository } = await libs.getMocks();

            const { acceptValue } = getAcceptValue();
            const { returnValue } = getReturnValue();

            jest.spyOn(userRepository, 'findFirstOrThrow').mockResolvedValue(returnValue);

            expect(await validateUserExistenceByField.transform(acceptValue.value, acceptValue.metadata)).toStrictEqual(
                returnValue
            );
        });
    });

    describe('when a "user" is not found', () => {
        it('should throw error', async () => {
            const { validateUserExistenceByField, userRepository } = await libs.getMocks();

            const { acceptValue } = getAcceptValue();

            jest.spyOn(userRepository, 'findFirstOrThrow').mockImplementation(() => {
                throw new TypeError();
            });

            await expect(
                validateUserExistenceByField.transform(acceptValue.value, acceptValue.metadata)
            ).rejects.toThrow(TypeError);
        });
    });

    describe('when a "metadata.data" is "undefined"', () => {
        it('should throw error', async () => {
            const { validateUserExistenceByField } = await libs.getMocks();

            const { acceptValue } = getAcceptValue();

            const metadata: ArgumentMetadata = {
                type: acceptValue.metadata.type,
            };

            await expect(validateUserExistenceByField.transform(acceptValue.value, metadata)).rejects.toThrow();
        });
    });
});
