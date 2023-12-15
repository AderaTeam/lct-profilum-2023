import { Injectable, UseGuards } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Social } from './entities/social.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRolesGuard } from '../user/user.guard';
import { Roles } from '../decorators/roles.decorator';
import { SocialUsers } from './entities/socialsUsers.entity';

@Injectable()
export class SocialsService {
  constructor(
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
    this.socialsRepository.create({name: 'LeaderID', description: 'Сообщества, записи на стене, комментарии'})

  }

  async upsert()
  {
    this.socialsRepository.upsert({name: 'VK', description: 'Сообщества, записи на стене, комментарии'}, {conflictPaths: ["name"]})
  }

  async findAll() {
    return await this.socialsRepository.find();
  }

  async findOneByUserId(id: number)
  {
    return await this.socialsUsersRepository.findOne({where:{originaluserid: id}})
  }

  async findOne(id: number) {
    return await this.socialsRepository.findOneBy({id: id});
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
