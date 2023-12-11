import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
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
        return await this.userService.getOneById(userid)
    }

    @UseGuards(AccessTokenGuard)
    @Post(':userid')
    public async updateOne(@Param('userid') userid: number, @Body() userDto: UserUpdateDto)
    {
        return await this.userService.updateOne(userid, userDto)
    }

    @UseGuards(AccessTokenGuard)
    @Delete(':userid')
    public async deleteOne(@Param('userid') userid)
    {
        return await this.userService.deleteOne(userid)
    }
}
