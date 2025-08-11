import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getusers/:userType')
  getUser(@Param('userType') userType: string) {
    return this.appService.getUser(userType);
  }

  @Post('/adduser')
  addUser(@Body() userData: CreateUserDto) {
    return this.appService.addUser(userData);
  }
}
