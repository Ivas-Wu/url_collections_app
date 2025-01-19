export const textboxStyles = {
  paper: {
    padding: 3,
    maxWidth: 500,
    margin: 'auto',
    marginTop: 4,
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    textAlign: 'center',
  },
  textField: {
    marginBottom: 2,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: '8px 16px',
    fontWeight: 'bold',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  link: {
    marginTop: 2,
    textAlign: 'center',
    fontSize: '1rem',
    a: {
      color: '#3f51b5',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  errorbox: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '80vh', 
    textAlign: 'center' 
  },
};