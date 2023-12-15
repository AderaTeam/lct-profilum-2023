import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from '../auth/dtos/auth.dto';
import { UserUpdateDto } from './dtos/userUpdate.dto';
import { AccessTokenGuard } from '../auth/accessToken.guard';

@Controller('user')
export class UserController
{
    constructor(
        private readonly userService: UserService
    ){}
    
    @Delete('dropall')
    public async dropAll()
    {
        return await this.userService.dropall()
    }

    @Get()
    public async getAll()
    {
        return await this.userService.getAll()
    }

    @Get(':userid/achievements')
    public async getAchievementsById(@Param('userid') userid: number)
    {
        return await this.userService.getAchievements(userid)
    }

    @Get(':userid')
    public async getOneById(@Param('userid') userid: number)
    {
        return await this.userService.getOneByNickname((await this.userService.getOneById(userid)).nickname)
    }

    @UseGuards(AccessTokenGuard)
    @Post('')
    public async updateOne(@Body() userDto: UserUpdateDto, @Req() req)
    {
        return await this.userService.updateOne(req.user.id, userDto)
    }

    @UseGuards(AccessTokenGuard)
    @Delete('')
    public async deleteOne(@Req() req)
    {
        return await this.userService.deleteOne(req.user.sub)
    }
}
