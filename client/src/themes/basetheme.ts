import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
            '&::-webkit-scrollbar': {
            width: '0.3em', 
            },
            '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888', 
            borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
            },
            '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            },
        },
      },
    },
  },
});

export default theme;