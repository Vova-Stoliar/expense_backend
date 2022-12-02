import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AccessTokenStrategy } from '~/app/strategies/classes/access-token.strategy';
import { RefreshTokenStrategy } from '~/app/strategies/classes/refresh-token.strategy';
import { TokenHelper } from '~/app/strategies/helpers/token.helper';
import { UserRepository } from '~/shared/repositories/user';

export const TokenStrategyProvider: Provider[] = [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TokenHelper,
    UserRepository,
];
