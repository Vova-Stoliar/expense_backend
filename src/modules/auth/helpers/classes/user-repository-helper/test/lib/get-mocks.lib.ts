import { Test } from '@nestjs/testing';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { getBcryptHelperMock } from '~/modules/auth/helpers/classes/bcrypt-helper/mock';
import { UserRepositoryHelper } from '~/modules/auth/helpers/classes/user-repository-helper';
import { UserRepository } from '~/repositories/user';
import { getUserRepositoryMock } from '~/repositories/user/repository/mock';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [UserRepositoryHelper],
    })
        .useMocker((token) => {
            if (token === BcryptHelper) return getBcryptHelperMock();

            if (token === UserRepository) return getUserRepositoryMock();

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const userRepositoryHelper = moduleRef.get<UserRepositoryHelper>(UserRepositoryHelper);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { userRepositoryHelper, userRepository };
};
