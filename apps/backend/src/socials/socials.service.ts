import { Injectable, UseGuards } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Social } from './entities/social.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRolesGuard } from '../user/user.guard';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class SocialsService {
  constructor(
    @InjectRepository(Social)
    private socialsRepository: Repository<Social>,
  ){}
  @UseGuards(UserRolesGuard)
  @Roles('admin')
  async create(createSocialDto: CreateSocialDto) {
    const social = this.socialsRepository.create(createSocialDto)
    return await this.socialsRepository.save(social);
  }

  async findAll() {
    return await this.socialsRepository.find();
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
