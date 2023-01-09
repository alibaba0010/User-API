import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async updateUser(userId: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }
}
