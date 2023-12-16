import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Social } from './entities/social.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { UserRolesGuard } from '../user/user.guard';
import { Roles } from '../decorators/roles.decorator';
import { SocialUsers } from './entities/socialsUsers.entity';
import { UserService } from '../user/user.service';
import { CreateUsersSocialDto } from './dto/create-users-social.dto';

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
    await this.socialsRepository.insert({name: 'VK', description: 'Сообщества, записи на стене, комментарии'})
    await this.socialsRepository.insert({name: 'LeaderID', description: 'Мероприятия, команды'})
    await this.socialsRepository.insert({name: 'Steam', description: 'Игры, сообщества'})
    return 'ok'
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
    return await this.socialsUsersRepository.findOne({where: {originaluserid: originalid, social: Equal<string>(socialname)}, relations:{user: true, social: true}})
  }

  async findAllByUserId(userid: number)
  {
    const userSocials = await this.socialsUsersRepository.find({where: {user: Equal<number>(userid)}, relations:{user: false, social: true}, select:{id: false, originaluserid: false}})
    Logger.log(userSocials)
    const socials = await this.socialsRepository.find()
    let ans = {}
    // for (const socialConnect of userSocials)
    // {
      
    // }
    return{...(userSocials)}
  }

  async findOne(id: number) {
    return await this.socialsRepository.findOneBy({id: id});
  }

  async addUsersSocial(createUsersSocialDto: CreateUsersSocialDto)
  {
    const newUser = await this.socialsUsersRepository.create(
      {
        originaluserid: createUsersSocialDto.originaluserid, 
        social: await this.socialsRepository.findOneBy({name: createUsersSocialDto.socialname}), 
        user: await this.userService.getOneById(createUsersSocialDto.userid)
      }
      )
    return await this.socialsUsersRepository.save(newUser)
  }

  // @UseGuards(UserRolesGuard)
  // @Roles('admin')
  // async update(id: number, updateSocialDto: UpdateSocialDto) {
  //   return await this.socialsRepository.update(id, updateSocialDto);
  // }

  // @UseGuards(UserRolesGuard)
  // @Roles('admin')
  // async remove(id: number) {
  //   return await this.socialsRepository.delete({id: id});
  // }
}
