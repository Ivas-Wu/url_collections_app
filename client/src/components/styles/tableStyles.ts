import { SxProps, Theme } from '@mui/material';

const tableStyles = {
  paper: {
    padding: 2,
    backgroundColor: '#fff', 
    borderRadius: 2, 
  } as SxProps<Theme>,

  typography: {
    marginBottom: 2, 
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    color: '#333',
    textAlign: 'left',
  } as SxProps<Theme>,

  tableContainer: {
    marginTop: 2,
  } as SxProps<Theme>,

  tableContainerSettings: {
    marginTop: 2,
    maxHeight: "15em", 
    overflow: "auto",
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
  } as SxProps<Theme>,

  tableHead: {
    backgroundColor: '#f5f5f5', 
  } as SxProps<Theme>,

  tableCell: {
    fontWeight: 600,
  } as SxProps<Theme>,

  pagination: {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
  } as SxProps<Theme>,
};

export default tableStyles;