import { HttpException, Injectable } from '@nestjs/common';
import { Author } from 'src/interfaces/author.interface';

@Injectable()
export class AuthorsService {
  public authors: Author[] = [];

  findAll(): Author[] {
    return this.authors;
  }

  findById(authorId: string): Author {
    const author = this.authors.find((a) => a.id === authorId);
    return author;
  }

  create(author: Author) {
    //check to see if author already exists in the database
    if (this.authors.some((a: Author) => a.name === author.name)) {
      return HttpException;
      //add id to author if it doesn't exist
    } else if (!author.id && !this.authors.length) {
      author.id = '1';
      return this.authors.push({ ...author });
      //add id to author if it doesn't exist
    } else if (!author.id && this.authors.length) {
      author.id = (this.authors.length + 1).toString();
      return this.authors.push({ ...author });
      //check to make sure author has a name
    } else if (!author.name) {
      return 'author is required to have a name';
      //author meets mandatory requirements, push to db
    } else if (author.name && author.id) {
      return this.authors.push(author);
    }
  }
}
