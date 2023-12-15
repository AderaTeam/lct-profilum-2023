import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Social } from './entities/social.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRolesGuard } from '../user/user.guard';
import { Roles } from '../decorators/roles.decorator';
import { SocialUsers } from './entities/socialsUsers.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class SocialsService {
  constructor(
    private userService: UserService,
    @InjectRepository(Social)
    private socialsRepository: Repository<Social>,
    @InjectRepository(SocialUsers)
    private socialsUsersRepository: Repository<SocialUsers>
  ){}
  @UseGuards(UserRolesGuard)
  @Roles('admin')
  async create(createSocialDto: CreateSocialDto) {
    const social = this.socialsRepository.create(createSocialDto)
    return await this.socialsRepository.save(social);
  }

  async initialize()
  {
    this.socialsRepository.create({name: 'VK', description: 'Сообщества, записи на стене, комментарии'})
    this.socialsRepository.create({name: 'LeaderID', description: 'Мероприятия, команды'})

  }

  async upsert()
  {
    this.socialsRepository.upsert({name: 'VK', description: 'Сообщества, записи на стене, комментарии'}, {conflictPaths: ["name"]})
  }

  async findAll() {
    return await this.socialsRepository.find();
  }

  async getAllUsersSocial()
  {
    return await this.socialsUsersRepository.find()
  }

  async findOneByUserId(socialname: string, originalid: string)
  {
    return await this.socialsUsersRepository.findOneBy({originaluserid: originalid, social: await this.socialsRepository.findOneBy({name: socialname})})
  }

  async findOne(id: number) {
    return await this.socialsRepository.findOneBy({id: id});
  }

  async addUsersSocial(userid: number, socialname: string, originalid: string)
  {
    Logger.log("AddingUser")
    return await this.socialsUsersRepository.create({originaluserid: originalid, social: await this.socialsRepository.findOneBy({name: socialname}), user: await this.userService.getOneById(userid)})
  }

  @UseGuards(UserRolesGuard)
  @Roles('admin')
  async update(id: number, updateSocialDto: UpdateSocialDto) {
    return await this.socialsRepository.update(id, updateSocialDto);
  }

  @UseGuards(UserRolesGuard)
  @Roles('admin')
  async remove(id: number) {
    return await this.socialsRepository.delete({id: id});
  }
}
