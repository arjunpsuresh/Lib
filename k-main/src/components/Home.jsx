import { Container, Typography, Button, Stack, Box, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300); // smooth fade-in
  }, []);

  return (
    <>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1512820790803-83ca734da794)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mb: 8,
          borderRadius: 3,
        }}
      >
        {/* Glassmorphism Overlay */}
        <Fade in={showContent}>
          <Box
            sx={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(6px)',
              p: 4,
              borderRadius: 4,
              color: 'white',
              maxWidth: 600,
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Welcome to Your Library
            </Typography>
            <Typography variant="h6" sx={{ mb: 5 }}>
              "A room without books is like a body without a soul."
            </Typography>

            {/* Only Login Button */}
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #6b5b95, #b8a9c9)',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              Login
            </Button>
          </Box>
        </Fade>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#212121', py: 3, mt: 4 }}>
        <Typography variant="body2" align="center" color="white">
          © {new Date().getFullYear()} Library Management. Designed with ❤️
        </Typography>
      </Box>
    </>
  );
};

export default Home;
