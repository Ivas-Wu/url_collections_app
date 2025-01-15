import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import CollectionsPage from './pages/collectionPage'; // Import the Collections page
import RedirectPage from './pages/redirectPage';
import AppLayout from './components/navBar/AppLayout';
import CollectionSearchComponent from './components/collectionSearch/collectionSearchComponent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page */}
          <Route path="/collections" element={<CollectionSearchComponent />} /> {/* TODO */}
          <Route path="/collections/:collectionId" element={<CollectionsPage />} /> {/* Collections page */}
          <Route path="/:shortUrl" element={<RedirectPage />} /> {/* Redirect page */}
        </Routes>
        </AppLayout>
    </BrowserRouter>
  );
};

export default App;