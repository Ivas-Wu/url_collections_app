export const appBarStyles = (isScrolled: boolean) => ({
  backgroundColor: isScrolled ? '#EBEAFF' : '#F2F5FF',
  boxShadow: isScrolled ? '0 2px 6px rgba(0, 0, 0, 0.2)' : 'none',
  transition: 'background-color 0.3s, box-shadow 0.3s',
});

export const toolbarStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0 16px',
};

export const buttonContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
};

export const menuButton = {
  color: '#844995',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '1.25em',
  fontFamily: 'Roboto, sans-serif',
  height: '100%',
  borderRadius: 0,
  padding: '0 3em 0 3em',
  '&:hover': {
    backgroundCOlor: 'primary.secondary',
  },
};

export const containerContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  height: '5em',
  transition: 'height 0.5s',
  '&:hover': {
    height: '5.5em',
  },
};
