import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';
import { useState } from 'react';

const FINE_PER_DAY = 2; // dollars per day overdue
const BORROW_PERIOD_DAYS = 15; // fine starts after 15 days

const ViewBooks = ({ books, setBooks }) => {

  const calculateFine = (borrowDate) => {
    if (!borrowDate) return 0;
    const borrowed = new Date(borrowDate);
    const now = new Date();
    const diffTime = now - borrowed;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const overdueDays = diffDays - BORROW_PERIOD_DAYS;
    return overdueDays > 0 ? overdueDays * FINE_PER_DAY : 0;
  };

  const handlePayFine = (id) => {
    // Reset borrowDate to today after paying fine (optional logic)
    setBooks(books.map(book =>
      book.id === id
        ? { ...book, borrowDate: new Date().toISOString().split('T')[0] } // reset borrowDate
        : book
    ));
  };

  const handleReserveBook = (id, user) => {
    setBooks(books.map(book => 
      book.id === id
        ? { ...book, reserved: true, reservedBy: user } // Mark as reserved and store user
        : book
    ));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Library Books</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Author</strong></TableCell>
              <TableCell><strong>Genre</strong></TableCell> {/* Added Genre column */}
              <TableCell><strong>Published</strong></TableCell> {/* Added Published column */}
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Reserved By</strong></TableCell>
              <TableCell><strong>Borrow Date</strong></TableCell>
              <TableCell><strong>Fine</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => {
              const fine = book.borrowed ? calculateFine(book.borrowDate) : 0;
              return (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell> {/* Display Genre */}
                  <TableCell>{book.published}</TableCell> {/* Display Published Year */}
                  <TableCell>{book.borrowed ? 'Borrowed' : book.reserved ? 'Reserved' : 'Available'}</TableCell>
                  <TableCell>{book.reserved ? book.reservedBy : '-'}</TableCell>
                  <TableCell>{book.borrowed ? book.borrowDate : '-'}</TableCell>
                  <TableCell>
                    {fine > 0 ? `⚠️ $${fine}` : '-'}
                  </TableCell>
                  <TableCell>
                    {fine > 0 && (
                      <Button variant="contained" color="error" size="small" onClick={() => handlePayFine(book.id)}>
                        Pay Fine
                      </Button>
                    )}
                    {!book.reserved && !book.borrowed && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleReserveBook(book.id, "User1")} // Replace "User1" with actual user
                      >
                        Reserve
                      </Button>
                    )}
                    {book.reserved && (
                      <Typography variant="body2" color="textSecondary">
                        Reserved
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewBooks;
