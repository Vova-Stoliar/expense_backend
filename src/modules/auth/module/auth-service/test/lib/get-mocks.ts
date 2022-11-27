import { Test } from '@nestjs/testing';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import { getAuthFacadeMockHelper } from '~/modules/auth/helpers/classes/auth-facade-helper/mock';
import { AuthService } from '~/modules/auth/module/auth-service';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [AuthService],
    })
        .useMocker((token) => {
            if (token === AuthFacadeHelper) {
                return getAuthFacadeMockHelper();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const authService = moduleRef.get<AuthService>(AuthService);

    return { authService };
};
