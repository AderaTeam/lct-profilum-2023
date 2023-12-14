import { Module } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { SocialsController } from './socials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Social } from './entities/social.entity';
import { SocialUsers } from './entities/socialsUsers.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Social, SocialUsers])],
  controllers: [SocialsController],
  providers: [SocialsService],
  exports: [SocialsService]
})
export class SocialsModule {}
