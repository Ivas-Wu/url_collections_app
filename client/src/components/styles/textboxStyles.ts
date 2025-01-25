export const textboxStyles = {
  paper: {
    padding: 3,
    margin: '3em',
    backgroundColor: 'secondary.light', //'#FCFCFC',
    borderRadius: '16px',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.1)',
    minWidth: 300,
    "@media (min-width: 0px)": {
      width: '90%',
    },
    "@media (min-width: 600px)": {
      width: '75%',
    },
    "@media (min-width: 1200px)": {
      width: '40%',
    },
    "@media (min-width: 2400px)": {
      width: '25%',
    },
  },

  textField: {
    marginBottom: 2,
  },
  button: {
    backgroundColor: 'secondary.main',
    color: 'secondary.dark',
    fontWeight: '400',
    fontSize: '1.15rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'secondary.dark',
      color: 'secondary.contrastText',
    },
  },
  link: {
    textAlign: 'center',
    fontSize: '1.5rem',
    paddingTop: '2em',
    a: {
      color: 'secondary.dark',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
      padding: '8px 0 0 8px',
    },
  },
  errorbox: {
    display: 'flex',
    jc: 'center',
    ai: 'center',
    height: '80vh',
    textAlign: 'center'
  },
  titleContainer: {
    display: "flex",
    jc: "space-between",
    ai: "center",
    mb: 2,
  },
  titleText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#secondary.dark',
    textAlign: "left",
    flexGrow: 1,
  },
  titleIcon: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  formBody: {
    pt: '0.5em',
  }
};