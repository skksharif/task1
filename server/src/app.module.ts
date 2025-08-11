import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adults } from './entities/adult.entity';
import { Children } from './entities/child.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Adults, Children]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
