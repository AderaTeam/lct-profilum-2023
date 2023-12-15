import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { UserService } from '../user/user.service';
import { PathsModule } from '../paths/paths.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Card]),
    UserService,
    PathsModule
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
