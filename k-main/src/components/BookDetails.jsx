import { useParams } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const book = books.find(book => book.id === parseInt(id));

  if (!book) return <Typography sx={{ mt: 4 }}>Book not found</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>by {book.author}</Typography>
        <Typography>Status: {book.borrowed ? 'Borrowed' : 'Available'}</Typography>
      </Paper>
    </Container>
  );
};

export default BookDetails;
