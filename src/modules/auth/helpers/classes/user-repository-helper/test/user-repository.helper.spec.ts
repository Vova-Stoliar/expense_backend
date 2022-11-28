import { libs } from './lib';

describe('UserRepositoryHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { userRepositoryHelper } = await libs.getMocks();

        expect(userRepositoryHelper).toBeDefined();
    });

    describe('createUser', () => {
        const { getAcceptValue, getReturnValue } = libs.createUser();

        it('should return "user"', async () => {
            const { userRepositoryHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await userRepositoryHelper.createUser(acceptValue)).toStrictEqual(returnValue);
        });
    });

    describe('updateUser', () => {
        const { getAcceptValue, getReturnValue } = libs.updateUser();

        it('should return "user"', async () => {
            const { userRepositoryHelper } = await libs.getMocks();

            const { returnValue } = getReturnValue();
            const { acceptValue } = getAcceptValue();

            expect(await userRepositoryHelper.updateUser(acceptValue)).toStrictEqual(returnValue);
        });
    });
});
