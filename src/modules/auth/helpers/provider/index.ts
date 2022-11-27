import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { RefreshTokenHelper } from '~/modules/auth/helpers/classes/refresh-token-helper';
import { UserRepositoryHelper } from '~/modules/auth/helpers/classes/user-repository-helper';

export const HelpersProvider: Provider[] = [
    JwtHelper,
    BcryptHelper,
    UserRepositoryHelper,
    RefreshTokenHelper,
    AuthFacadeHelper,
];
