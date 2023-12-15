import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { CreateMultiplePathDto } from './dto/create-multiple-path.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';
import { Repository } from 'typeorm';
import { PathStep } from './entities/pathStep.entity';
import { PathStepContent } from './entities/pathStepContent.entity';
import { PathStepTag } from './entities/pathTag.entity';
import { OwnedPath } from './entities/ownedPath.entity';
import { CreateOwnedPathDto } from './dto/create-owned-path.dto';
import { UserService } from '../user/user.service';
import { CreateAnalyzedPathDto } from './dto/create-analyzed-path.dto';
import { STATUS_CODES } from 'http';

@Injectable()
export class PathsService {
  constructor(
    private userService: UserService,
    @InjectRepository(Path)
    private pathRepository: Repository<Path>,
    @InjectRepository(PathStep)
    private pathStepRepository: Repository<PathStep>,
    @InjectRepository(PathStepContent)
    private pathStepContentRepository: Repository<PathStepContent>,
    @InjectRepository(PathStepTag)
    private pathStepTagRepository: Repository<PathStepTag>,
    @InjectRepository(OwnedPath)
    private ownedPathRepository: Repository<OwnedPath>,
  ){}
  async create(createPathDto: CreatePathDto) {
    let steps = []
    for (const step of createPathDto.steps)
    {
      let tags = []
      for (const tag of step.tags)
      {
        if (!(await this.pathStepTagRepository.findOneBy({name: tag})))
        {
          const newTag = this.pathStepTagRepository.create({name: tag})
          const tagToAdd = await this.pathStepTagRepository.save(newTag)
          tags.push(tagToAdd)
        }
        else
        {
          tags.push(await this.pathStepTagRepository.findOneBy({name: tag}))
        }
      }

      const newContent = this.pathStepContentRepository.create(step.content)
      const content = await this.pathStepContentRepository.save(newContent)

      const newStep = this.pathStepRepository.create({...step, tags: tags, content: content})
      const stepToAdd = await this.pathStepRepository.save(newStep)
      steps.push(stepToAdd)
    }
    const path = this.pathRepository.create({...createPathDto, pathSteps: steps})
    return this.pathRepository.save(path)
  }

  async createMultiple(createPathDto: CreateMultiplePathDto) {
    let paths = []
    for(const path of createPathDto.paths)
    {
      paths.push(await this.create(path))
    }
    return paths
  }

  async createOwnage(createOwnedPathDto: CreateOwnedPathDto)
  {
    for (const pathId of createOwnedPathDto.pathIds)
    {
      if (!(await this.userService.getOneById(createOwnedPathDto.userId)) || !(await this.pathRepository.findOneBy({id: pathId})))
        {
          throw new HttpException('User or path does not exist', HttpStatus.BAD_REQUEST)
        }
      await this.ownedPathRepository.insert(
          {
            user: (await this.userService.getOneById(createOwnedPathDto.userId)),
            path: (await this.pathRepository.findOneBy({id: pathId}))
          }
        )
    }
    return {result: (await this.userService.getOneById(createOwnedPathDto.userId)).paths}
  }

  async dropOwnageForUser(id: number)
  {
    for (const pathId of createOwnedPathDto.pathIds)
    {
      if (!(await this.userService.getOneById(createOwnedPathDto.userId)) || !(await this.pathRepository.findOneBy({id: pathId})))
        {
          throw new HttpException('User or path does not exist', HttpStatus.BAD_REQUEST)
        }
      await this.ownedPathRepository.insert(
          {
            user: (await this.userService.getOneById(createOwnedPathDto.userId)),
            path: (await this.pathRepository.findOneBy({id: pathId}))
          }
        )
    }
    return {result: (await this.userService.getOneById(createOwnedPathDto.userId)).paths}
  }

  async findAll() {
    return await this.pathRepository.find({relations:{pathSteps: {content: true, tags: true}}})
  }

  async find3() {
    return {result: await this.pathRepository.find({relations:{pathSteps: {content: true, tags: true}}, take: 3})}
  }

  async findOne(id: number) {
    return await this.pathRepository.findOneBy({id: id})
  }

  async update(id: number, updatePathDto: UpdatePathDto) {
    return await this.pathRepository.update(id, updatePathDto);
  }

  async remove(id: number) {
    return await this.pathRepository.delete({id: id});
  }

  async removeAll() {
    return this.pathRepository.delete({})
  }
}
