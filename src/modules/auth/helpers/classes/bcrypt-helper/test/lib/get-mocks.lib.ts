import { Test } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { BcryptHelper } from '../../bcrypt.helper';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [BcryptHelper],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const bcryptHelper = moduleRef.get<BcryptHelper>(BcryptHelper);

    const hash = jest.spyOn(bcrypt, 'hash');

    return { bcryptHelper, hash };
};
