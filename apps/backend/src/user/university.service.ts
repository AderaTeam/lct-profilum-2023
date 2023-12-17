import { Injectable, Logger } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Univercity } from "./entities/university.entity"
import { Repository } from "typeorm"
import { CreateUniDto } from "./dtos/createUni.dto"
import { UniTag } from "./entities/uniTag.entity"

@Injectable()
export class UniversityService {
    constructor(
        @InjectRepository(Univercity)
        private uniRepository: Repository<Univercity>,
        @InjectRepository(UniTag)
        private uniTagRepository: Repository<UniTag>
    ){}

    public async create(uni: CreateUniDto)
    {
        Logger.log(uni.tags)
        Logger.log(uni.tags[0])
        uni.tags = String(uni.tags)
        let tags:UniTag[] = []
        // for (const tag of uni.tags)
        // {
        //     if (await this.uniTagRepository.findOneBy({name: tag}))
        //     {
        //         tags.push(await this.uniTagRepository.findOneBy({name: tag}))
        //     }
        //     else
        //     {
        //         const newTag = this.uniTagRepository.create({name: tag})
        //         const tagToAdd = await this.uniTagRepository.save(newTag)
        //         tags.push(tagToAdd)
        //     }
        // }
        if (await this.uniTagRepository.findOneBy({name: 'После 9'}))
        {
            tags.push(await this.uniTagRepository.findOneBy({name: 'После 9'}))
        }
        else
        {
            const newTag = this.uniTagRepository.create({name: 'После 9'})
            const tagToAdd = await this.uniTagRepository.save(newTag)
            tags.push(tagToAdd)
        }
        if (await this.uniTagRepository.findOneBy({name: 'После 11'}))
        {
            tags.push(await this.uniTagRepository.findOneBy({name: 'После 11'}))
        }
        else
        {
            const newTag = this.uniTagRepository.create({name: 'После 11'})
            const tagToAdd = await this.uniTagRepository.save(newTag)
            tags.push(tagToAdd)
        }if (await this.uniTagRepository.findOneBy({name: uni.tags}))
        {
            tags.push(await this.uniTagRepository.findOneBy({name: uni.tags}))
        }
        else
        {
            const newTag = this.uniTagRepository.create({name: uni.tags})
            const tagToAdd = await this.uniTagRepository.save(newTag)
            tags.push(tagToAdd)
        }
        Logger.log(tags)
        const newUni = this.uniRepository.create({...uni, tags: []})
        await this.uniRepository.save(newUni)
        return newUni
    }

    public async getAll()
    {
        return await this.uniRepository.find()
    }

    public async getImage(id: number)
    {
        return (await this.uniRepository.findOneBy({id: id})).imageBuff
    }

    public async dropall()
    {
        return await this.uniRepository.delete({})
    }

    public async deleteById(id: number)
    {
        return await this.uniRepository.delete({id: id})
    }
}