import { getUser } from '~/modules/auth/constants/test';
import { getFirstDefinedValueFromObject } from '~/modules/auth/lib';

describe('getFirstDefinedValueFromObject', () => {
    describe('whe all values in an object are defined', () => {
        it('should return an object with first defined value', () => {
            const { email, id } = getUser();

            const acceptValue = {
                email,
                id,
            };

            const returnValue = {
                email,
            };

            expect(getFirstDefinedValueFromObject(acceptValue)).toEqual(returnValue);
        });
    });

    describe('when non of the values in object are defined', () => {
        it('should return empty object', () => {
            const acceptValue = {
                email: undefined,
                id: undefined,
            };

            const returnValue = {};

            expect(getFirstDefinedValueFromObject(acceptValue)).toEqual(returnValue);
        });
    });
});
