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
    height: '5em',
  };
  
  export const buttonContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  };
  
  export const menuButton = {
    color: '#7986cb',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1em',
    height: '100%',
    borderRadius: 0,
    padding: '0 3em 0 3em',
    '&:hover': {
      backgroundColor: '#d1c4e9',
    },
  };

  export const containerContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  