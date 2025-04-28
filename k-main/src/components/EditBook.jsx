import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper, Stack } from '@mui/material';

const EditBook = ({ books, setBooks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookToEdit = books.find(book => book.id === parseInt(id));

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
    }
  }, [bookToEdit]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setBooks(
      books.map(book =>
        book.id === parseInt(id) ? { ...book, title, author } : book
      )
    );
    navigate('/view');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Edit Book</Typography>
        <form onSubmit={handleUpdate}>
          <Stack spacing={2}>
            <TextField
              label="Book Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Author"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <Button variant="contained" type="submit">Update Book</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default EditBook;
