import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AccessTokenStrategy, RefreshTokenStrategy } from '~/app/strategies/classes';

export const TokenStrategyProvider: Provider[] = [AccessTokenStrategy, RefreshTokenStrategy];
