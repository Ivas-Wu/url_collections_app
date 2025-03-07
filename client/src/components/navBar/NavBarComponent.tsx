import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Container, Box, IconButton, Drawer, List, ListItem, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
  appBarStyles,
  toolbarStyles,
  menuButton,
  logoStyles,
  navigationStyles,
  authButtonsStyles,
  authButton,
  signUpButton,
  mobileMenuStyles,
  logoText
} from './NavBarStyles';
import { useAuth } from '../auth/authContext';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = (
    <>
      <Button component={Link} to="/home" sx={menuButton}>
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
    </>
  );

  const authButtons = (
    <Box sx={authButtonsStyles}>
      {isLoggedIn ? (
        <Button variant="outlined" component={Link} to="/logout" sx={authButton}>
          Logout
        </Button>
      ) : (
        <>
          <Button variant="outlined" component={Link} to="/login" sx={authButton}>
            Login
          </Button>
          <Button variant="contained" component={Link} to="/signup" sx={signUpButton}>
            Sign Up
          </Button>
        </>
      )}
    </Box>
  );

  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={mobileMenuStyles.drawer}
    >
      <Box sx={mobileMenuStyles.drawerHeader}>
        <Box component="span" sx={mobileMenuStyles.drawerLogo}>𝓤</Box>
        <IconButton 
          onClick={handleDrawerToggle}
          sx={mobileMenuStyles.closeButton}
        >
          ✕
        </IconButton>
      </Box>

      <List sx={mobileMenuStyles.list}>
        <ListItem sx={mobileMenuStyles.listItem}>
          <Button 
            component={Link} 
            to="/home" 
            sx={mobileMenuStyles.button}
            onClick={handleDrawerToggle}
            fullWidth
          >
            Home
          </Button>
        </ListItem>
        <ListItem sx={mobileMenuStyles.listItem}>
          <Button 
            component={Link} 
            to="/collections" 
            sx={mobileMenuStyles.button}
            onClick={handleDrawerToggle}
            fullWidth
          >
            Collections
          </Button>
        </ListItem>
        {isLoggedIn && (
          <ListItem sx={mobileMenuStyles.listItem}>
            <Button 
              component={Link} 
              to="/collections/user" 
              sx={mobileMenuStyles.button}
              onClick={handleDrawerToggle}
              fullWidth
            >
              My Collections
            </Button>
          </ListItem>
        )}
      </List>

      <Box sx={mobileMenuStyles.authSection}>
        {isLoggedIn ? (
          <Button
            variant="outlined"
            component={Link}
            to="/logout"
            sx={mobileMenuStyles.authButton}
            onClick={handleDrawerToggle}
            fullWidth
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              sx={mobileMenuStyles.authButton}
              onClick={handleDrawerToggle}
              fullWidth
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/signup"
              sx={mobileMenuStyles.signUpButton}
              onClick={handleDrawerToggle}
              fullWidth
            >
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="fixed" sx={appBarStyles(isScrolled)}>
      <Container maxWidth="xl">
        <Toolbar sx={toolbarStyles}>
          {/* Logo */}
          <Box component={Link} to="/home" sx={logoStyles}>
            <Box component="span" sx={logoText}>𝓤</Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <Box sx={navigationStyles}>
                {navigationItems}
              </Box>
              {authButtons}
            </>
          )}

          {/* Mobile Menu Button - Updated styling */}
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                ml: 'auto',
                color: 'primary.main',
                display: { xs: 'flex', md: 'none' }
              }}
            >
              <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      {mobileDrawer}
    </AppBar>
  );
};

export default NavBar;
