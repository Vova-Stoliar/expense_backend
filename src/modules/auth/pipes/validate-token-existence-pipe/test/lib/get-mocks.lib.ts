import { Test } from '@nestjs/testing';
import { ValidateTokenExistence } from '~/modules/auth/pipes';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [ValidateTokenExistence],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const validateTokenExistence = moduleRef.get<ValidateTokenExistence>(ValidateTokenExistence);

    return { validateTokenExistence };
};
