export const appBarStyles = (isScrolled: boolean) => ({
  background: isScrolled 
    ? 'rgba(255, 255, 255, 0.8)' 
    : 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(10px)',
  boxShadow: isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'all 0.3s ease',
});

export const toolbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 1rem',
  height: '4rem',
  width: '100%',
};

export const logoStyles = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
};

export const logoText = {
  fontSize: '2.5rem',
  fontFamily: 'cursive',
  fontWeight: 700,
  color: 'primary.main',
  textDecoration: 'none',
  marginRight: '2rem',
};

export const navigationStyles = {
  display: 'flex',
  gap: '1rem',
  marginRight: 'auto',
};

export const menuButton = {
  color: 'text.primary',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '&.active': {
    color: 'primary.main',
    backgroundColor: 'rgba(132, 73, 149, 0.08)',
  },
};

export const authButtonsStyles = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
};

export const authButton = {
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  padding: '0.5rem 1.5rem',
};

export const signUpButton = {
  ...authButton,
  backgroundColor: 'primary.main',
  color: 'white',
  '&:hover': {
    backgroundColor: 'primary.dark',
  },
};

export const mobileMenuStyles = {
  drawer: {
    '& .MuiDrawer-paper': { 
      boxSizing: 'border-box', 
      width: '100%',
      maxWidth: '400px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  drawerLogo: {
    fontSize: '2rem',
    fontFamily: 'cursive',
    fontWeight: 700,
    color: 'primary.main',
  },
  closeButton: {
    color: 'text.secondary',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  list: {
    padding: '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  listItem: {
    padding: 0,
    width: '100%',
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    fontSize: '1.1rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  authSection: {
    padding: '1.5rem',
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  authButton: {
    textTransform: 'none',
    fontSize: '1rem',
    padding: '0.75rem',
    borderRadius: '8px',
    borderColor: 'primary.main',
    color: 'primary.main',
    '&:hover': {
      borderColor: 'primary.dark',
      backgroundColor: 'rgba(132, 73, 149, 0.04)',
    },
  },
  signUpButton: {
    textTransform: 'none',
    fontSize: '1rem',
    padding: '0.75rem',
    borderRadius: '8px',
    backgroundColor: 'primary.main',
    color: 'white',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
};

export const mobileMenuButton = {
  marginLeft: 'auto',
  color: 'primary.main',
  display: { xs: 'flex', md: 'none' },
};
