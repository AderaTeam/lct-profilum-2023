import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';
import { OwnedPath } from './entities/ownedPath.entity';
import { PathStep } from './entities/pathStep.entity';
import { PathStepContent } from './entities/pathStepContent.entity';
import { PathTag } from './entities/pathTag.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Path, OwnedPath, PathStep, PathStepContent, PathTag])],
  controllers: [PathsController],
  providers: [PathsService],
})
export class PathsModule {}
