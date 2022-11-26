import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { ValidateTokenExistence } from '~/modules/auth/pipes';
import { getTokens } from '~/modules/auth/test/stubs';

const moduleMocker = new ModuleMocker(global);

const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [ValidateTokenExistence],
    })
        .useMocker((token) => {
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);

                return new Mock();
            }
        })
        .compile();

    const validateTokenExistence = moduleRef.get<ValidateTokenExistence>(ValidateTokenExistence);

    return { validateTokenExistence };
};
describe('ValidateTokenExistence', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', async () => {
        const { validateTokenExistence } = await getMocks();

        expect(validateTokenExistence).toBeDefined();
    });

    describe('when token is passed', () => {
        it('should return "token"', async () => {
            const { validateTokenExistence } = await getMocks();

            expect(validateTokenExistence.transform(getTokens().refreshToken)).toBe(getTokens().refreshToken);
        });
    });

    describe('when token is not passed', () => {
        it('should throw error', async () => {
            const { validateTokenExistence } = await getMocks();

            jest.spyOn(validateTokenExistence, 'transform').mockImplementation(() => {
                throw new TypeError();
            });

            expect(() => validateTokenExistence.transform()).toThrow(TypeError);
        });
    });
});
