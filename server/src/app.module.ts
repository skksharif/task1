import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './database/database.module';
import { Adults } from './entities/adult.entity';
import { Children } from './entities/child.entity';
import { Processing } from './entities/processing.entry';

import { PublisherModule } from './publisher/publisher.module';
import { WorkerModule } from './worker/worker.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Adults, Children, Processing]),
    PublisherModule,
    WorkerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
