import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: { userId: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    delete user.hash;
    return user;
  }
}
