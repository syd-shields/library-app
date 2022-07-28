import { Author } from 'src/interfaces/author.interface';
import { Book } from 'src/interfaces/book.interface';

export default function BookCard(props) {
  const authors: Array<Author> = props.authors;
  const book: Book = props.book;

  const author = authors.find((a) => a.id === book.authorId);

  return (
    <div className="book">
      {author ? (
        <div>
          <h2>{book.title}</h2>
          <p className="author">{author.name}</p>
          <p className="description">{book.description}</p>
        </div>
      ) : (
        <div>{book.title}</div>
      )}
    </div>
  );
}
