import { BadRequestException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Equal, EqualOperator, Repository } from 'typeorm';
import { UserResponseDto } from './dtos/userResponse.dto';
import { UserUpdateDto } from './dtos/userUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos/user.dto';
import { AchievementOwned } from '../database/entities-index';
import { VkUserDto } from '../auth/dtos/vk.user.dto';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(AchievementOwned)
        private readonly achievementOwnedRepository: Repository<AchievementOwned>,
    ){}

    public async create(user: CreateUserDto | VkUserDto)
    {
        //Logger.log(user)
        const newUser =  this.userRepository.create(user)
        await this.userRepository.save(newUser)
        return newUser
    }

    public async getOneById(id: number)
    {
        return await this.userRepository.findOne({where:{id: id}})
    }

    public async getAchievements(id: number)
    {
        return await this.achievementOwnedRepository.find({where: {user: Equal<number>(id)}, relations: {achievement: true}, select: {achievement: {image: false, id: true, name: true}}} )
    }

    public async getOneByUsername(username: string)
    {
        return await this.userRepository.findOne({where:{username: username}})
    }

    public async getOneByNickname(nickname: string)
    {
        return await this.userRepository.findOne({where:{nickname: nickname}, relations:{paths: true}})
    }

    public async getAll()
    {
        return await this.userRepository.find({relations: {socials: {social: true}}})
    }

    public async updateOne(userid: number, userDto: UserUpdateDto)
    {
        let user = await this.getOneById(userid)
        Object.assign(user, userDto)
        return await this.userRepository.save(user)
    }

    public async deleteOne(id: number)
    {
        return await this.userRepository.delete(id)
    }

    async dropall()
    {
        return await this.userRepository.delete({})
    }
}
