import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { CreateMultiplePathDto } from './dto/create-multiple-path.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';
import { Any, Equal, Repository } from 'typeorm';
import { PathStep } from './entities/pathStep.entity';
import { PathStepContent } from './entities/pathStepContent.entity';
import { PathStepTag } from './entities/pathTag.entity';
import { OwnedPath } from './entities/ownedPath.entity';
import { CreateOwnedPathDto } from './dto/create-owned-path.dto';
import { UserService } from '../user/user.service';
import { CreateAnalyzedPathDto } from './dto/create-analyzed-path.dto';
import { STATUS_CODES } from 'http';
import { Speciality } from './entities/spaciality.entity';
import { User } from '../database/entities-index';

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
    @InjectRepository(Speciality)
    private specialitiesRepository: Repository<Speciality>,
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

    let specialities = []
    for(const speciality of createPathDto.specialities)
    {
      //Logger.log(speciality)
      if(!(await this.specialitiesRepository.findOneBy({name: speciality})))
      {
        const newSpeciality = this.specialitiesRepository.create({name: speciality})
        const specToAdd = await this.specialitiesRepository.save(newSpeciality)
        specialities.push(specToAdd)
      }
      else
      {
        specialities.push(await this.specialitiesRepository.findOneBy({name: speciality}))
      }
    }
    
    const path = this.pathRepository.create({...createPathDto, pathSteps: steps, specialities: specialities})
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

    if (await this.ownedPathRepository.find({where:{user: Equal<User>(await this.userService.getOneById(createOwnedPathDto.userId))}}))
        {
          await this.ownedPathRepository.delete({user: Equal<User>(await this.userService.getOneById(createOwnedPathDto.userId))})
        }
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
    return await this.ownedPathRepository.delete({user: Equal<User>(await this.userService.getOneById(id))})
  }

  async stepProgress(pathid: number)
  {
    let ownedPath = await this.ownedPathRepository.findOne({where: {id: pathid}, relations:{user: true}})
    let user = await this.userService.getOneById(ownedPath.user.id)
    Logger.log(await this.pathRepository.findOneBy({id: ownedPath.path.id}))
    user.points += (await this.pathStepRepository.findOneBy({path: Equal<Path>(await this.pathRepository.findOneBy({id: ownedPath.path.id})), step: ownedPath.currentStep})).points
    ownedPath.currentStep = ownedPath.currentStep + 1;
    await this.userService.updateOne(ownedPath.user.id, user)
    await this.ownedPathRepository.save(ownedPath)
    return this.userService.getOneById(ownedPath.user.id)
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

  // async update(id: number, updatePathDto: UpdatePathDto) {
  //   return await this.pathRepository.update(id, updatePathDto);
  // }

  async remove(id: number) {
    return await this.pathRepository.delete({id: id});
  }
//removeSome
  // async removeAll() {
  //   for(const path of await this.pathRepository.find())
  //   {
  //     for (const user of path.users)
  //     {
  //       const newList: Path[] = []
  //       for (const usersPath of user.analyzedPaths)
  //       {
  //         if(usersPath.id != path.id)
  //         {
  //           newList.push(usersPath)
  //         }
  //       }
  //       this.userService.updateOne(user.id, {...user, analyzedPaths: [newList]})
  //     }
  //   }
  //   return this.pathRepository.delete({})
  // }

  async removeAll() {
    for (const user of await this.userService.getAll())
    {
      await this.userService.updateOne(user.id, {...user, analysedPaths: []})
    }
    return this.pathRepository.delete({})
  }
}
