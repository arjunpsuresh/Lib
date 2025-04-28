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
import Login from './components/Login';
import Signin from './components/Signin'; // <-- added this!

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('https://fakerapi.it/api/v1/books?_quantity=10')
      .then(res => {
        const apiBooks = res.data.data.map(book => ({
          id: Math.random().toString(36).substr(2, 9),
          title: book.title,
          author: book.author,
          genre: book.genre,
          published: new Date(book.published).getFullYear(),
          borrowed: false,
          borrowedBy: '',
          borrowDate: ''
        }));
        setBooks(apiBooks);
      })
      .catch(err => console.error('Failed to fetch books:', err));
  }, []);

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
