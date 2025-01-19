import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import CollectionsPage from './pages/collectionPage'; // Import the Collections page
import RedirectPage from './pages/redirectPage';
import AppLayout from './components/navBar/AppLayout';
import CollectionSearchComponent from './components/collectionSearch/collectionSearchComponent';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import theme from './themes/basetheme';
import { CssBaseline, ThemeProvider } from '@mui/material';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionSearchComponent />} />
            <Route path="/collections/:collectionId" element={<CollectionsPage />} />
            <Route path="/:shortUrl" element={<RedirectPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;