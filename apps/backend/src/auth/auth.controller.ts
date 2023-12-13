import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { RefreshTokenGuard } from './refreshToken.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    
    @Post()
    public async createOne(@Body() userDto: UserDto)
    {
        return await this.authService.signUp(userDto)
    }

    @Post('vk')
    public async createOneReferalVK(@Param('silent_token') silentToken: string, @Param('uuid') uuid: string)
    {
        Logger.log(silentToken, ' ', uuid)


        return await this.authService.signUpVk(silentToken, uuid)
    }

    @Post('signin')
    public async signin(@Body() userDto: AuthDto)
    {
        return await this.authService.signIn(userDto)
    }
    
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: Record<string, any>) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }

}
