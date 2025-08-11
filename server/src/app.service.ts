import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Adults } from './entities/adult.entity';
import { Children } from './entities/child.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Adults)
    private adultRepo: Repository<Adults>,
    @InjectRepository(Children)
    private childRepo: Repository<Children>,
  ) {}

  async addUser(userData: CreateUserDto) {
    const { name, age } = userData;

    if (age >= 18) {
      await this.adultRepo.save({ name, age });
      return { message: `${name} added to adults table` };
    } else {
      await this.childRepo.save({ name, age });
      return { message: `${name} added to children table` };
    }
  }
  async getUser(userType: string) {
    if (userType === 'adults') 
        return this.adultRepo.find();
    if (userType === 'children') 
        return this.childRepo.find();
    return { message: 'Invalid user type' };
  }
}
