import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController {
  @UseGuards()
  @Get()
  getCurrentUser() {
    return 'Hello User';
  }
}
