import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Get('user')

  // appends whatever is logged from the validate fn in jwtStrategy to the req.user
  getCurrentUser(@GetUser() user: User) {
    // @Req() req: Request
    return user;
  }

  @Patch()
  updateUser(@GetUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }
}
