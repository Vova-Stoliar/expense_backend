import { Test } from '@nestjs/testing';
import { RefreshTokenHelper } from '~/modules/auth/helpers/classes/refresh-token-helper';
import { UserRepository } from '~/repositories/user';
import { getUserRepositoryMock } from '~/repositories/user/repository/mock';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [RefreshTokenHelper],
    })
        .useMocker((token) => {
            if (token === UserRepository) {
                return getUserRepositoryMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const refreshTokenHelper = moduleRef.get<RefreshTokenHelper>(RefreshTokenHelper);

    return { refreshTokenHelper };
};
