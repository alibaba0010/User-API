import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get()

  //   appends whatever is logged from the validate fn in jwtStrategy to the req.user
  getCurrentUser(@Req() req: Request) {
    return req.user;
  }
}
