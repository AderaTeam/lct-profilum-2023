import { Injectable } from '@nestjs/common';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { CreateMultiplePathDto } from './dto/create-multiple-path.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PathsService {
  constructor(
    @InjectRepository(Path)
    private pathRepository: Repository<Path>,
  ){}
  create(createPathDto: CreatePathDto) {
    return this.pathRepository.insert(createPathDto)
  }

  createMultiple(createPathDto: CreateMultiplePathDto) {
    for(const path of createPathDto.paths)
    {

    }
  }

  async findAll() {
    return await this.pathRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} path`;
  }

  update(id: number, updatePathDto: UpdatePathDto) {
    return `This action updates a #${id} path`;
  }

  remove(id: number) {
    return `This action removes a #${id} path`;
  }

  removeAll() {
    return this.pathRepository.delete({})
  }
}
