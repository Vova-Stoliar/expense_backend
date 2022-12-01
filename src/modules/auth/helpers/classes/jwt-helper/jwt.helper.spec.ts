import { Test } from '@nestjs/testing';
import { generateTokens, generateUser } from '~/modules/auth/constants/test';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { getMockByToken } from '~/shared/lib/get-mock-by-token.lib';

const getMocks = async () => {
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

describe('JwtHelper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { jwtHelper } = await getMocks();

        expect(jwtHelper).toBeDefined();
    });

    describe('getTokens', () => {
        it('should return "refresh", "access" tokens and "createdAt"', async () => {
            const { jwtHelper } = await getMocks();
            const { id, email, createdAt } = generateUser();
            const { accessToken, refreshToken } = generateTokens();

            const returnValue = {
                accessToken,
                refreshToken,
                createdAt,
            };

            const acceptValue = { id, email };

            jest.spyOn(Promise, 'all').mockResolvedValue([generateTokens().accessToken, generateTokens().refreshToken]);
            jest.useFakeTimers().setSystemTime(new Date(createdAt));

            expect(await jwtHelper.getTokens(acceptValue)).toEqual(returnValue);
        });
    });
});
