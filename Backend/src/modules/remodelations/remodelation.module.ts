import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemodelationController } from './remodelation.controller';
import { RemodelationService } from './remodelation.service';
import { Remodelation } from './remodelation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remodelation])],
  controllers: [RemodelationController],
  providers: [RemodelationService],
  exports: [RemodelationService],
})
export class RemodelationModule {}
