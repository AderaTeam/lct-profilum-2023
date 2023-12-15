import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { PathsService } from '../paths/paths.service';

@Injectable()
export class CommunityService {

  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private userService: UserService,
    private pathService: PathsService
  ){}
  async createCard(createCardDto: CreateCardDto) {
    return await this.cardRepository.insert({
      ...createCardDto,
      author: await this.userService.getOneById(createCardDto.author_id),
      path: await this.pathService.findOne(createCardDto.path_id)
    })
  }

  async findAllCards() {
    return await this.cardRepository.find({});
  }

  async findAllCardsByUser(id: number) {
    return await this.cardRepository.find({where: {author: await this.userService.getOneById(id)}});
  }

  findOneCard(id: number) {
    return `This action returns a #${id} community`;
  }

  updateCard(id: number, updateCommunityDto: UpdateCardDto) {
    return `This action updates a #${id} community`;
  }

  removeCard(id: number) {
    return `This action removes a #${id} community`;
  }
}
