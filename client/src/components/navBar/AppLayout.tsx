import React, { useState } from 'react';
import { Container, Box, Drawer, Toolbar } from '@mui/material';
import NavBar from './NavBarComponent';
import appLayoutStyles from './AppLayoutStyles';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {

  return (
    <Box sx={appLayoutStyles.container}>
      <NavBar />

      <Box component="main" sx={appLayoutStyles.mainContent}>
        <Container maxWidth={false} sx={appLayoutStyles.bodyContainer}>
          {children}
        </Container>
      </Box>

      <Box component="footer" sx={appLayoutStyles.footer}>
      </Box>
    </Box>
  );
};

export default AppLayout;
