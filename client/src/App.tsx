import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import CollectionsPage from './pages/collectionPage';
import RedirectPage from './pages/redirectPage';
import AppLayout from './components/navBar/AppLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import theme from './themes/basetheme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from './components/auth/authContext';
import LogoutPage from './pages/LogoutPage';
import UserCollectionsPage from './pages/userCollectionsPage';
import CollectionsLandingPage from './pages/collectionsLandingPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsLandingPage />} />
              <Route path="/collections/:collectionId" element={<CollectionsPage />} />
              <Route path="/collections/user" element={<UserCollectionsPage />} />
              <Route path="/:shortUrl" element={<RedirectPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};
export default App;
