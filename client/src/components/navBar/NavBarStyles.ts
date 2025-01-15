export const appBarStyles = (isScrolled: boolean) => ({
    backgroundColor: isScrolled ? '#e0f7fa' : '#ede7f6', // Light blue or light purple
    boxShadow: isScrolled ? '0 2px 6px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  });
  
  export const toolbarStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0 16px',
    height: '5em', // Standard AppBar height in MUI
  };
  
  export const buttonContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    height: '100%', // Full height of AppBar
  };
  
  export const menuButton = {
    borderColor: '#7986cb', // Soft purple
    color: '#7986cb', // Match border color
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1em',
    height: '100%', // Full height of AppBar
    borderRadius: 0, // Square corners to emphasize edges
    padding: '0 3em 0 3em',
    '&:hover': {
      backgroundColor: '#d1c4e9', // Lighter purple on hover
    },
  };
  