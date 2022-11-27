import { Test } from '@nestjs/testing';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [JwtHelper],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const jwtHelper = moduleRef.get<JwtHelper>(JwtHelper);

    return { jwtHelper };
};
