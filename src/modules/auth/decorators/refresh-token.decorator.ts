import { applyDecorators, UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from '~/modules/auth/guards';
import { Public } from '~/shared/decorators';

export function RefreshToken() {
    return applyDecorators(Public(), UseGuards(RefreshTokenGuard));
}
