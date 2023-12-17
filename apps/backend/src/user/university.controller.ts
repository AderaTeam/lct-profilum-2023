import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UniversityService } from "./university.service";
import { CreateUniDto } from "./dtos/createUni.dto";

@Controller('university')
export class UniversityController
{
    constructor(
        private readonly uniService: UniversityService
    ){}
    
    @Delete('dropall')
    public async dropAll()
    {
        return await this.uniService.dropall()
    }

    @Post()
    public async createOne(@Body() uniDto: CreateUniDto)
    {
        return await this.uniService.create(uniDto)
    }

    @Get()
    public async getAll()
    {
        return await this.uniService.getAll()
    }

    @Delete(':id')
    public async deleteOneById(@Param('id')id: number)
    {
        return await this.uniService.deleteById(id)
    }
}