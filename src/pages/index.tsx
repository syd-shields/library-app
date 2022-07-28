import { useState, useEffect } from 'react';
import { Book } from 'src/interfaces/book.interface';
import { Author } from 'src/interfaces/author.interface';

import BookCard from 'src/components/BookCard';

export default function App() {
  const [bookData, setBookData] = useState<Array<Book>>([]);
  const [authorData, setAuthorData] = useState<Array<Author>>([]);
  const [refreshedBookData, setRefreshedBookData] = useState<Array<Book>>([]);
  const [refreshedAuthorData, setRefreshedAuthorData] = useState<Array<Author>>(
    [],
  );
  const [autoRefresh, setAutoRefresh] = useState(false);

  //seed book database
  const postBookData = async () => {
    bookData.map(async (book) => {
      await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
    });
  };

  //seed author database
  const postAuthorData = async () => {
    authorData.map(async (author) => {
      await fetch('http://localhost:5000/api/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
      });
    });
  };

  //get seed data or if already seeded get data from local db
  const fetchBookData = async () => {
    if (bookData[0]) {
      await fetch('http://localhost:5000/api/books')
        .then((res) => res.json() as Promise<Array<Book>>)
        .then((data) => {
          setRefreshedBookData(data);
        });
    } else {
      await fetch('http://www.mocky.io/v2/5e1683a23000004d00d56089')
        .then((res) => res.json() as Promise<Array<Book>>)
        .then((data) => {
          setBookData(data);
        });
    }
  };

  //get seed data or if already seeded get data from local db
  const fetchAuthorData = async () => {
    if (authorData[0]) {
      await fetch('http://localhost:5000/api/authors')
        .then((res) => res.json() as Promise<Array<Author>>)
        .then((data) => {
          setRefreshedAuthorData(data);
        });
    } else {
      await fetch('http://www.mocky.io/v2/5e1684a93000002c00d5608e')
        .then((res) => res.json() as Promise<Array<Author>>)
        .then((data) => {
          setAuthorData(data);
        });
    }
  };

  useEffect(() => {
    if (!bookData[0] || !authorData[0]) {
      fetchAuthorData()
        .then(() => fetchBookData())
        .then(() => postAuthorData())
        .then(() => postBookData());
    } else {
      postAuthorData()
        .then(() => postBookData())
        .then(() => setAutoRefresh(true));
    }
  }, [bookData]);

  //auto refresh data
  useEffect(() => {
    const dataRefresh = () => {
      fetchAuthorData().then(() => fetchBookData());
    };

    setInterval(() => dataRefresh(), 1000 * 10);
  }, [autoRefresh]);

  return (
    <div className="page">
      <div className="page-title">
        <h1>Welcome to the Library</h1>
      </div>
      <ul className="books">
        {refreshedBookData[0]
          ? refreshedBookData.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                authors={refreshedAuthorData}
              />
            ))
          : bookData.map((book) => (
              <BookCard key={book.id} book={book} authors={authorData} />
            ))}
      </ul>
    </div>
  );
}
