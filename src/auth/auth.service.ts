import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDto) {
    try {
      const { firstName, email, password } = dto;
      const hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: { firstName, email, hash },
      });
      delete user.hash;
      return user;
    } catch (error) {
      // Error from a unique field
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credientials already exist');
        throw error.message;
      }
    }
  }
  async signIn(dto: AuthDto) {
    const { email, password} = dto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new ForbiddenException('Credientials Incorrect');

    const comparePassword = await argon.verify(user.hash, password);
    if (!comparePassword)
      throw new ForbiddenException('Credientials Incorrect');

    delete user.hash;
    return user;
  }
}
