import { SxProps, Theme } from '@mui/material';

export const textboxStyles = {
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  titleText: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: 'text.primary',
  },
  titleIcon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'text.secondary',
    '&:hover': {
      color: 'text.primary',
    },
  },
  formBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
    },
  },
  button: {
    mt: 2,
    textTransform: 'none',
    fontWeight: 500,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    mt: 2,
    a: {
      color: 'primary.main',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
} as const; 