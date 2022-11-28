import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import type { Tokens } from '~/shared/types';

export async function validateRefreshTokens(
    param: { hashedRefreshToken: Tokens['refreshToken'] } & Pick<Tokens, 'refreshToken'>
) {
    const { hashedRefreshToken, refreshToken } = param;

    const isRefreshTokenValid = await compare(refreshToken, hashedRefreshToken);

    if (!isRefreshTokenValid) throw new UnauthorizedException();
}
