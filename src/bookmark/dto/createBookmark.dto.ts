import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  constructor() {}
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  link: string;
}
