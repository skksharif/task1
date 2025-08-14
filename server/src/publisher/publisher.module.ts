import { Module } from '@nestjs/common';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Processing } from '../entities/processing.entry';

@Module({
  imports: [TypeOrmModule.forFeature([Processing])],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}
