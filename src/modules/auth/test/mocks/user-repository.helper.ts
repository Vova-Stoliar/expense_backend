import { getCreateUserReturnValue } from '~/modules/auth/test/stubs';

export const getUserRepositoryHelperMock = () => ({
    createUser: jest.fn().mockResolvedValue(getCreateUserReturnValue()),
});
