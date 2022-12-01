import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AccessTokenStrategy } from '~/app/strategies/classes/access-token.strategy';
import { RefreshTokenStrategy } from '~/app/strategies/classes/refresh-token.strategy';

export const TokenStrategyProvider: Provider[] = [AccessTokenStrategy, RefreshTokenStrategy];
