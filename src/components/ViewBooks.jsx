import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Box, FormControl,
  InputLabel, Select, MenuItem, OutlinedInput, Checkbox,
  ListItemText, TextField
} from '@mui/material';
import { useState } from 'react';

const FINE_PER_DAY = 2;
const BORROW_PERIOD_DAYS = 15;

// Static genre list to ensure more options
const STATIC_GENRES = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Biography",
  "Mystery", "Thriller", "Romance", "Historical", "Self-Help",
  "Adventure", "Horror", "Poetry", "Drama", "Philosophy",
  "Children", "Young Adult", "Graphic Novel", "Cooking", "Travel"
];

const ViewBooks = ({ books, setBooks }) => {
  const [genreFilter, setGenreFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    setBooks(books.map(book =>
      book.id === id
        ? { ...book, borrowDate: new Date().toISOString().split('T')[0] }
        : book
    ));
  };

  const handleReserveBook = (id, user) => {
    setBooks(books.map(book =>
      book.id === id
        ? { ...book, reserved: true, reservedBy: user }
        : book
    ));
  };

  // Merge static and dynamic genres
  const dynamicGenres = books.map(book => book.genre);
  const genres = Array.from(new Set([...STATIC_GENRES, ...dynamicGenres])).sort();

  const years = [...new Set(books.map(book => String(book.published)))].sort();

  const handleClearFilters = () => {
    setGenreFilter([]);
    setYearFilter([]);
    setSearchTerm('');
  };

  const filteredBooks = books.filter(book => {
    const matchesGenres = genreFilter.length === 0 || genreFilter.includes(book.genre);
    const matchesYears = yearFilter.length === 0 || yearFilter.includes(String(book.published));
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesGenres && matchesYears && matchesSearch;
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Library Books</Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        {/* Genre Multi-select */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Genre</InputLabel>
          <Select
            multiple
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            input={<OutlinedInput label="Filter by Genre" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                <Checkbox checked={genreFilter.indexOf(genre) > -1} />
                <ListItemText primary={genre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year Multi-select */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Year</InputLabel>
          <Select
            multiple
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            input={<OutlinedInput label="Filter by Year" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                <Checkbox checked={yearFilter.indexOf(year) > -1} />
                <ListItemText primary={year} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Input */}
        <TextField
          size="small"
          label="Search Title/Author"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        {/* Clear Filters Button */}
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Author</strong></TableCell>
              <TableCell><strong>Genre</strong></TableCell>
              <TableCell><strong>Published</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Reserved By</strong></TableCell>
              <TableCell><strong>Borrow Date</strong></TableCell>
              <TableCell><strong>Fine</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map(book => {
              const fine = book.borrowed ? calculateFine(book.borrowDate) : 0;
              return (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.published}</TableCell>
                  <TableCell>{book.borrowed ? 'Borrowed' : book.reserved ? 'Reserved' : 'Available'}</TableCell>
                  <TableCell>{book.reserved ? book.reservedBy : '-'}</TableCell>
                  <TableCell>{book.borrowed ? book.borrowDate : '-'}</TableCell>
                  <TableCell>
                    {fine > 0 ? `⚠️ $${fine}` : '-'}
                  </TableCell>
                  <TableCell>
                    {fine > 0 && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handlePayFine(book.id)}
                      >
                        Pay Fine
                      </Button>
                    )}
                    {!book.reserved && !book.borrowed && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleReserveBook(book.id, "User1")}
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
