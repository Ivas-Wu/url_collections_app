import { SxProps, Theme } from '@mui/material';

const collectionDetailListingStyles = {
  paper: {
    padding: 2,
    backgroundColor: '#fff', // Ensure a clean background
    borderRadius: 2, // Rounded corners
  } as SxProps<Theme>,

  typography: {
    marginBottom: 2, // Spacing between the title and table
  } as SxProps<Theme>,

  tableContainer: {
    marginTop: 2, // Space between title and table
  } as SxProps<Theme>,

  tableHead: {
    backgroundColor: '#f5f5f5', // Light gray background for headers
  } as SxProps<Theme>,

  tableCell: {
    fontWeight: 600, // Bold for headers
  } as SxProps<Theme>,

  pagination: {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
  } as SxProps<Theme>,
};

export default collectionDetailListingStyles;
