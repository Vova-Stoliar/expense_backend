import { AuthGuard } from '@nestjs/passport';
import { STRATEGIES_NAMES } from '~/shared/constants';

export class RefreshTokenGuard extends AuthGuard(STRATEGIES_NAMES.refreshToken) {}
