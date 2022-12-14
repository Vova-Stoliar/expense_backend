import type { MatcherFunction } from 'expect';
import { validate as uuidValidate } from 'uuid';

export const toBeUUID: MatcherFunction = function (actual?: unknown) {
    if (typeof actual !== 'string') {
        throw new Error('Uuid must be of type string!');
    }

    const isUuidValid = uuidValidate(actual);

    if (isUuidValid) {
        return {
            message: () => `expected ${this.utils.printReceived(actual)} not to be "uuid"`,
            pass: isUuidValid,
        };
    } else {
        return {
            message: () => `expected ${this.utils.printReceived(actual)} to be "uuid"`,
            pass: isUuidValid,
        };
    }
};
