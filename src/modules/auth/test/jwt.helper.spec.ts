import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt.helper';
import { getTokens, getUser } from '~/modules/auth/test/stubs';

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [JwtHelper],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
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
        it('should return "refresh" and "access" tokens', async () => {
            const { jwtHelper } = await getMocks();

            jest.spyOn(Promise, 'all').mockResolvedValue([getTokens().accessToken, getTokens().refreshToken]);

            expect(await jwtHelper.getTokens({ id: getUser().id, email: getUser().email })).toStrictEqual(getTokens());
        });
    });
});
