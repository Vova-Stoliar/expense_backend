import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { ValidateUserPassword } from '~/modules/auth/pipes';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [ValidateUserPassword],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const validateUserPassword = moduleRef.get<ValidateUserPassword>(ValidateUserPassword);

    const compare = jest.spyOn(bcrypt, 'compare');

    return { validateUserPassword, compare };
};
