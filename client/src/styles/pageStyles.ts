import { SxProps, Theme } from '@mui/material';

export const pageStyles = {
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${require('../assets/dot-grid.webp')})`,
    backgroundRepeat: "repeat",
    pt: 3,
    pb: 6,
    px: 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    height: '100%',
    maxWidth: '1200px !important',
    margin: '0 auto',
    px: 2,
  },
  workspaceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 2,
    p: 3,
    border: '1px solid rgba(0, 0, 0, 0.05)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
  },
  tabs: {
    mb: 3,
    borderBottom: 1,
    borderColor: 'divider',
    '& .MuiTab-root': {
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 500,
      minWidth: 120,
    },
  },
  contentArea: {
    minHeight: 300,
  },
  section: {
    p: 2,
  },
} as const; 