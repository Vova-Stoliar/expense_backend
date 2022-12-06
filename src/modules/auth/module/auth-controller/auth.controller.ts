import * as NestCommon from '@nestjs/common';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { RefreshToken } from '~/modules/auth/decorators/refresh-token.decorator';
import { UserToLoginDto, UserToResetPasswordDto, UserToSignupDto } from '~/modules/auth/dto';
import { AuthService } from '~/modules/auth/module/auth-service';
import { GetUserFromReq, GetUserFromReqPropertyByKey, Public } from '~/shared/decorators';
import type { BaseUser, Tokens } from '~/shared/types';

// TODO use use generateUser to build response
const getSwaggerResponse = {
    accessToken:
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDIyLTEyLTA2VDE1OjQ2OjU4LjUxNFoiLCJpZCI6IjQzMDJjNjQyLTBjY2UtNDI1NC1hN2VhLWZmMDA3ZTRkYzBmMiIsImVtYWlsIjoidm92YS5zdG9saWFyMzFAZ21haWwuY29tIiwiaWF0IjoxNjcwMzQxNjE4LCJleHAiOjE2NzA2MDA4MTh9.8CXuR62AveLmEF0uE1X18EIPh3eZW0OwZNqT3kPubNs',
    refreshToken:
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDIyLTEyLTA2VDE1OjQ2OjU4LjUxNFoiLCJpZCI6IjQzMDJjNjQyLTBjY2UtNDI1NC1hN2VhLWZmMDA3ZTRkYzBmMiIsImVtYWlsIjoidm92YS5zdG9saWFyMzFAZ21haWwuY29tIiwiaWF0IjoxNjcwMzQxNjE4LCJleHAiOjE2NzA5NDY0MTh9.pARbe1iHdVOXrvQzPh0NNw3BM44ipUvzW9LDpP-XrJU',
    user: {
        id: '4302c642-0cce-4254-a7ea-ff007e4dc0f2',
        email: 'vova.stoliar31@gmail.com',
        userName: 'User Name',
        displayName: 'Dispaly Name',
    },
};

@NestCommon.Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @NestCommon.Post('signup')
    @ApiCreatedResponse({
        schema: {
            example: getSwaggerResponse,
        },
    })
    @HttpCode(HttpStatus.CREATED)
    async signup(@NestCommon.Body() userToSignUp: UserToSignupDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.signup(userToSignUp);
    }

    @Public()
    @NestCommon.Post('login')
    @ApiOkResponse({
        schema: {
            example: getSwaggerResponse,
        },
    })
    @HttpCode(HttpStatus.OK)
    async login(@NestCommon.Body() userToLogin: UserToLoginDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.login(userToLogin);
    }

    @ApiBearerAuth()
    @NestCommon.Get('logout')
    @NestCommon.HttpCode(NestCommon.HttpStatus.NO_CONTENT)
    async logout(@GetUserFromReqPropertyByKey('id') id: User['id']): Promise<void> {
        await this.authService.logout({ id });
    }

    @ApiBearerAuth()
    @NestCommon.Post('resetPassword')
    @ApiOkResponse({
        schema: {
            example: getSwaggerResponse,
        },
    })
    @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
    async resetPassword(@NestCommon.Body() user: UserToResetPasswordDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.resetPassword(user);
    }

    @ApiBearerAuth()
    @RefreshToken()
    @NestCommon.Get('refresh')
    @ApiOkResponse({
        schema: {
            example: getSwaggerResponse,
        },
    })
    async refresh(@GetUserFromReq() user: Pick<User, 'email' | 'id'>): Promise<Tokens> {
        return this.authService.refresh(user);
    }
}
