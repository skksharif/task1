import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Processing } from '../entities/processing.entry';
import { Adults } from '../entities/adult.entity';
import { Children } from '../entities/child.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Processing, Adults, Children])],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
