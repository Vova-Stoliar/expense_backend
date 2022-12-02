import { normalizeUser } from '~/modules/auth/lib';
import { generateUser } from '~/shared/constants/test';

describe('normalizeUser', () => {
    it('should be defined', () => {
        expect(normalizeUser).toBeDefined();
    });

    it('should return "id", "email", "userName", "displayName" from a passed "user"', () => {
        const { id, email, userName, displayName, createdAt, updatedAt, password } = generateUser();

        const acceptValue = { id, email, userName, displayName, createdAt, updatedAt, password };
        const returnValue = { id, email, userName, displayName };

        expect(normalizeUser(acceptValue)).toEqual(returnValue);
    });
});
