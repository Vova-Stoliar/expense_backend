import { Test } from '@nestjs/testing';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { getBcryptHelperMock } from '~/modules/auth/helpers/classes/bcrypt-helper/mock';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { getJwtHelperMock } from '~/modules/auth/helpers/classes/jwt-helper/mock';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [AuthFacadeHelper],
    })
        .useMocker((token) => {
            if (token === BcryptHelper) return getBcryptHelperMock();

            if (token === JwtHelper) return getJwtHelperMock();

            if (typeof token === 'function') return getMockByToken(token);
        })
        .compile();

    const authFacadeHelper = moduleRef.get<AuthFacadeHelper>(AuthFacadeHelper);

    return { authFacadeHelper };
};
