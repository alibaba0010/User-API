import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  createBookmark(userId: number, dto: CreateBookmarkDto) {}

  getBookmarks(userId: number) {}

  getBookmarkById(userId: number, bookmarkId: number) {}

  updateBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: UpdateBookmarkDto,
  ) {}

  deleteBookmarkById(userId: number, bookmarkId: number) {}
}
