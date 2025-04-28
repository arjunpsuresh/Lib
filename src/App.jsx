import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AddBook from './components/AddBook';
import ViewBooks from './components/ViewBooks';
import EditBook from './components/EditBook';
import BookDetails from './components/BookDetails';
import BorrowBook from './components/BorrowBook';
import Login from './components/BorrowBook';
import Signin from './components/BorrowBook';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10')
      .then(res => {
        const booksData = res.data.items.map(item => {
          const info = item.volumeInfo;
          return {
            id: item.id,
            title: info.title,
            author: info.authors ? info.authors[0] : "Unknown",
            genre: info.categories ? info.categories[0] : "Unknown",
            published: info.publishedDate ? parseInt(info.publishedDate.substring(0, 4)) : "N/A",
            borrowed: false,
            borrowedBy: '',
            borrowDate: ''
          };
        });
        setBooks(booksData);
      })
      .catch(err => console.error('Failed to fetch books:', err));
  }, []); // Empty array ensures it runs once on mount

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook books={books} setBooks={setBooks} />} />
        <Route path="/view" element={<ViewBooks books={books} />} />
        <Route path="/borrow" element={<BorrowBook books={books} setBooks={setBooks} />} />
        <Route path="/edit/:id" element={<EditBook books={books} setBooks={setBooks} />} />
        <Route path="/details/:id" element={<BookDetails books={books} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Signin />} /> {/* <-- new Signin route */}
      </Routes>
    </>
  );
}

export default App;
