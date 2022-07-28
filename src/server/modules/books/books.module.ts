import { Module } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, AuthorsService],
})
export class BooksModule {}
