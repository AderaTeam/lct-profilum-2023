import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeController } from './analyze.controller';
import { UserModule } from '../user/user.module';
import { SocialsModule } from '../socials/socials.module';
import { PathsService } from '../paths/paths.service';

@Module({
  imports: [UserModule, SocialsModule, PathsService],
  controllers: [AnalyzeController],
  providers: [AnalyzeService],
})
export class AnalyzeModule {}
