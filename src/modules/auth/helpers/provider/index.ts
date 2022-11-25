import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AuthFacadeHelper, BcryptHelper, JwtHelper, RefreshTokenHelper } from '~/modules/auth/helpers/classes';

export const HelpersProvider: Provider[] = [JwtHelper, BcryptHelper, RefreshTokenHelper, AuthFacadeHelper];
