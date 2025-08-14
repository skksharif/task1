import { Controller, Post, Body } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreateUserDto } from '../dto/create-user.dto';

// Controller for handling user-related requests
@Controller('/api/users')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  // 3. Endpoint to add a new user
  @Post('/adduser')
  async addUser(@Body() userData: CreateUserDto) {
    return this.publisherService.addUser(userData);
  }
}
