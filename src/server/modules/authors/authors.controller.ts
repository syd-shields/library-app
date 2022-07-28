import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from 'src/interfaces/author.interface';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  async findAll(): Promise<Author[]> {
    const authors = this.authorsService.findAll();
    return authors;
  }

  @Post()
  async create(@Body() body: Author) {
    const author = this.authorsService.create(body);
    return author;
  }
}
