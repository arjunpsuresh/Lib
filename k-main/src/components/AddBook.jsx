import { useState } from 'react';
import {
  Container, TextField, Button, Paper, Typography, Stack,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const genresList = [
  "Fiction",
  "Non-fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Biography",
  "History",
  "Romance",
  "Thriller"
];

const AddBook = ({ books, setBooks }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [published, setPublished] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      author,
      genre,
      published: parseInt(published),
      borrowed: false,
      borrowedBy: '',
      borrowDate: ''
    };
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setGenre('');
    setPublished('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Add a New Book</Typography>
        <form onSubmit={handleSubmit}>
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
            <FormControl fullWidth required>
              <InputLabel>Genre</InputLabel>
              <Select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                label="Genre"
              >
                {genresList.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Published Year"
              type="number"
              fullWidth
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              required
              inputProps={{ min: 0, max: new Date().getFullYear() }}
            />
            <Button variant="contained" type="submit">Add Book</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBook;
