import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AccessTokenStrategy, RefreshTokenStrategy } from '~/shared/strategies/token/classes';

export const TokenStrategyProvider: Provider[] = [AccessTokenStrategy, RefreshTokenStrategy];
