import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from 'src/interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get()
  async findAll(): Promise<Book[]> {
    const books = this.booksService.findAll();
    return books;
  }

  @Post()
  async create(@Body() body: Book) {
    const book = this.booksService.create(body);
    return book;
  }
}
