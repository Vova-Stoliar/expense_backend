import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AuthFacadeHelper } from '~/modules/auth/helpers/classes/auth-facade-helper';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';

export const HelpersProvider: Provider[] = [JwtHelper, BcryptHelper, AuthFacadeHelper];
