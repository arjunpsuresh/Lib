import { useState } from 'react';
import {
  Container, Typography, Paper, FormControl, InputLabel, Select,
  MenuItem, TextField, Button, Stack, Divider
} from '@mui/material';

const BorrowBook = ({ books, setBooks }) => {
  const [selectedBorrowId, setSelectedBorrowId] = useState('');
  const [borrower, setBorrower] = useState('');
  const [selectedReturnId, setSelectedReturnId] = useState('');

  const handleBorrow = (e) => {
    e.preventDefault();
    const now = new Date().toLocaleDateString();
    setBooks(books.map(book =>
      book.id === selectedBorrowId
        ? { ...book, borrowed: true, borrowedBy: borrower, borrowDate: now }
        : book
    ));
    setSelectedBorrowId('');
    setBorrower('');
  };

  const handleReturn = () => {
    setBooks(books.map(book =>
      book.id === selectedReturnId
        ? { ...book, borrowed: false, borrowedBy: '', borrowDate: '' }
        : book
    ));
    setSelectedReturnId('');
  };

  const availableBooks = books.filter(book => !book.borrowed);
  const borrowedBooks = books.filter(book => book.borrowed);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Borrow a Book</Typography>
        <form onSubmit={handleBorrow}>
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Select Book</InputLabel>
              <Select
                value={selectedBorrowId}
                onChange={(e) => setSelectedBorrowId(e.target.value)}
                label="Select Book"
              >
                {availableBooks.map(book => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.title} — {book.author}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Borrower's Name"
              fullWidth
              value={borrower}
              onChange={(e) => setBorrower(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!selectedBorrowId || !borrower}
            >
              Confirm Borrow
            </Button>
          </Stack>
        </form>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>Return a Book</Typography>
        <Stack spacing={2}>
          <FormControl fullWidth required>
            <InputLabel>Select Borrowed Book</InputLabel>
            <Select
              value={selectedReturnId}
              onChange={(e) => setSelectedReturnId(e.target.value)}
              label="Select Borrowed Book"
            >
              {borrowedBooks.map(book => (
                <MenuItem key={book.id} value={book.id}>
                  {book.title} — {book.borrowedBy} on {book.borrowDate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleReturn}
            disabled={!selectedReturnId}
          >
            Confirm Return
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default BorrowBook;
