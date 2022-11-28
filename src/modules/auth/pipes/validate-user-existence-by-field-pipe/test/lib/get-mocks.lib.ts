import { Test } from '@nestjs/testing';
import { ValidateUserExistenceByField } from '~/modules/auth/pipes';
import { UserRepository } from '~/shared/repositories/user';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [ValidateUserExistenceByField],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const validateUserExistenceByField = moduleRef.get<ValidateUserExistenceByField>(ValidateUserExistenceByField);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { validateUserExistenceByField, userRepository };
};
