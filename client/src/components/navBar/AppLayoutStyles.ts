import { SxProps, Theme } from '@mui/material';

const appLayoutStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  } as SxProps<Theme>,

  mainContent: {
    flexGrow: 1, // Ensures main content grows to fill available space
    paddingTop: '5em', // Adjust this to your AppBar height
    paddingBottom: '5em',
  } as SxProps<Theme>,

  footer: {
    padding: '16px',
    backgroundColor: '#f5f5f5',
  } as SxProps<Theme>,
};

export default appLayoutStyles;
