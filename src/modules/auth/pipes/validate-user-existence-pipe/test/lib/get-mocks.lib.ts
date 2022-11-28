import { Test } from '@nestjs/testing';
import { ValidateUserExistence } from '~/modules/auth/pipes';
import { UserRepository } from '~/shared/repositories/user';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [ValidateUserExistence],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const validateUserExistence = moduleRef.get<ValidateUserExistence>(ValidateUserExistence);
    const userRepository = moduleRef.get<UserRepository>(UserRepository);

    return { validateUserExistence, userRepository };
};
