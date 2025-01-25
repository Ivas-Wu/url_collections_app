import { SxProps, Theme } from '@mui/material';

const appLayoutStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '0px',
  } as SxProps<Theme>,

  mainContent: {
    flexGrow: 1,
    paddingTop: '5em',
  } as SxProps<Theme>,

  footer: {
    padding: '16px',
    backgroundColor: '#f5f5f5',
  } as SxProps<Theme>,

  bodyContainer: {
    "@media (min-width: 0px)": {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    height: 'fit-content'
  }
  
};

export default appLayoutStyles;
