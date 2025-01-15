import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  appBarStyles,
  toolbarStyles,
  buttonContainerStyles,
  menuButton,
} from './NavBarStyles';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar position="fixed" sx={appBarStyles(isScrolled)}>
      <Container maxWidth="lg">
        <Toolbar sx={toolbarStyles}>
          <Box sx={buttonContainerStyles}>
            <Button component={Link} to="/" sx={menuButton}>
              Home
            </Button>
            <Button component={Link} to="/collections" sx={menuButton}>
              Collections
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
