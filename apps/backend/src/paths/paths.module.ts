import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';
import { OwnedPath } from './entities/ownedPath.entity';
import { PathStep } from './entities/pathStep.entity';
import { PathStepContent } from './entities/pathStepContent.entity';
import { PathStepTag } from './entities/pathTag.entity';
import { UserModule } from '../user/user.module';
import { AnalyzedPath } from './entities/analyzedPath.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Path, OwnedPath, PathStep, PathStepContent, PathStepTag, AnalyzedPath]),
    UserModule
  ],
  controllers: [PathsController],
  providers: [PathsService],
})
export class PathsModule {}
