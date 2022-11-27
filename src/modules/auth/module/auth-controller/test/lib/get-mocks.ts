import { Test } from '@nestjs/testing';
import { AuthController } from '~/modules/auth/module/auth-controller';
import { AuthService } from '~/modules/auth/module/auth-service';
import { getAuthServiceMock } from '~/modules/auth/module/auth-service/mock';
import { getMockByToken } from '~/shared/lib/get-mock-by-token';

export const getMocks = async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [AuthController],
    })
        .useMocker((token) => {
            if (token === AuthService) {
                return getAuthServiceMock();
            }

            if (typeof token === 'function') {
                return getMockByToken(token);
            }
        })
        .compile();

    const authController = moduleRef.get<AuthController>(AuthController);
    const authService = moduleRef.get<AuthService>(AuthService);

    return { authController, authService };
};
