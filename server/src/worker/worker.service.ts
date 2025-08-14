import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processing } from '../entities/processing.entry';
import { Adults } from '../entities/adult.entity';
import { Children } from '../entities/child.entity';

// Service for processing user dat
@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Processing)
    private processingRepo: Repository<Processing>,
    @InjectRepository(Adults)
    private adultRepo: Repository<Adults>,
    @InjectRepository(Children)
    private childRepo: Repository<Children>,
  ) {}

  //6. Method to process user data
  // This method retrieves the user data from the processing table and saves it to the appropriate table (Adults or Children)
  async processUser(id: number) {
    const record = await this.processingRepo.findOneBy({ id });
    if (!record) return;

    if (record.age >= 18) {
      await this.adultRepo.save({ name: record.name, age: record.age });
    } else {
      await this.childRepo.save({ name: record.name, age: record.age });
    }
    
    // Delete the record from processing table after processing
    await this.processingRepo.delete({ id });
  }
}
