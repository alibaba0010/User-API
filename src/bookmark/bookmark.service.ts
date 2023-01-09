import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    return await this.prisma.bookmark.create({ data: { userId, ...dto } });
  }

  async getBookmarks(userId: number) {
    return await this.prisma.bookmark.findMany({ where: { userId } });
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    return await this.prisma.bookmark.findFirst({ where: { userId } });
  }

  async updateBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: UpdateBookmarkDto,
  ) {
    const checkBookmarkId = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    if (!checkBookmarkId || checkBookmarkId.userId !== userId)
      throw new ForbiddenException('Access to update bookmark denied');

    return await this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const checkBookmarkId = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    if (!checkBookmarkId || checkBookmarkId.userId !== userId)
      throw new ForbiddenException('Access to delete bookmark denied');
    return await this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
