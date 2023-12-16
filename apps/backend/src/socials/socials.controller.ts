import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { CreateUsersSocialDto } from './dto/create-users-social.dto';

@Controller('socials')
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Post()
  create(@Body() createSocialDto: CreateSocialDto) {
    return this.socialsService.create(createSocialDto);
  }

  @Post('user')
  async createUsersSocial(@Body() createUsersSocialDto: CreateUsersSocialDto) {
    await this.socialsService.addUsersSocial(createUsersSocialDto);
    return this.socialsService.findAllByUserId(createUsersSocialDto.userid)
  }
  @Get()
  findAll() {
    return this.socialsService.findAll();
  }

  @Get('user/:id')
  findUser(@Param('id') id: number) {
    return this.socialsService.findAllByUserId(id);
  }

  @Get('users')
  findAllUsers() {
    return this.socialsService.getAllUsersSocial();
  }

  @Post('init')
  intitalize() {
    return this.socialsService.initialize();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialsService.findOne(+id);
  }

  // @Post(':id')
  // update(@Param('id') id: string, @Body() updateSocialDto: UpdateSocialDto) {
  //   return this.socialsService.update(+id, updateSocialDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.socialsService.remove(+id);
  // }
}
