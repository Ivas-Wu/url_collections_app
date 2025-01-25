import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  appBarStyles,
  toolbarStyles,
  buttonContainerStyles,
  menuButton,
  containerContainerStyles
} from './NavBarStyles';
import { useAuth } from '../auth/authContext';


const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

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
      <Container sx={containerContainerStyles}>
        <Toolbar sx={toolbarStyles}>
          <Box sx={buttonContainerStyles}>
            <Button component={Link} to="/" sx={menuButton}>
              Home
            </Button>
            <Button component={Link} to="/collections" sx={menuButton}>
              Collections
            </Button>
            {isLoggedIn && (
              <Button component={Link} to="/collections/user" sx={menuButton}>
                My Collections
              </Button>
            )}
          </Box>
        </Toolbar>
        <Toolbar sx={toolbarStyles}>
          <Box sx={buttonContainerStyles}>
            {isLoggedIn ? (
              <Button component={Link} to="/logout" sx={menuButton}>
                Logout
              </Button>
            ) : (
              <Box sx={buttonContainerStyles}>
                <Button component={Link} to="/login" sx={menuButton}>
                  Login
                </Button>
                <Button component={Link} to="/signup" sx={menuButton}>
                  Signup
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
