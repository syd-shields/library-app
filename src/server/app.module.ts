import { Module } from '@nestjs/common';
import { BooksController } from './modules/books/books.controller';
import { BooksService } from './modules/books/books.service';
import { BooksModule } from './modules/books/books.module';
import { AuthorsController } from './modules/authors/authors.controller';
import { AuthorsModule } from './modules/authors/authors.module';
import { AuthorsService } from './modules/authors/authors.service';
@Module({
  imports: [BooksModule, AuthorsModule],
  controllers: [BooksController, AuthorsController],
  providers: [BooksService, AuthorsService],
})
export class AppModule {}
