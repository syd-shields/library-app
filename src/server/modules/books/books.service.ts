import { Injectable } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { Book } from 'src/interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(private authorsService: AuthorsService) {}
  public books: Book[] = [];
  findAll(): Book[] {
    return this.books;
  }

  create(book: Book) {
    //reject duplicate books
    if (
      this.books.some(
        (b: Book) => b.title === book.title && b.authorId === book.authorId,
      )
    ) {
      return 'Book already exists';
    }

    const existingAuthor = this.authorsService.findById(book.authorId);

    //author should exist
    if (!existingAuthor && this.books.length) {
      return 'Author is field is required, check to make sure your author is saved before creating a new book.';
    }
    if (existingAuthor || (!existingAuthor && !this.books.length)) {
      //book already has an id
      if (book.id) {
        return this.books.push(book);
        //add id to book if it doesn't exist
      } else if (!book.id && !this.books.length) {
        book.id = '1';
        return this.books.push({ ...book });
        //add id to book if it doesn't exist
      } else if (!book.id && this.books.length) {
        book.id = (this.books.length + 1).toString();
        return this.books.push({ ...book });
      } else {
        return 'Author is field is required, check to make sure your author is saved before creating a new book.';
      }
    }
  }
}
