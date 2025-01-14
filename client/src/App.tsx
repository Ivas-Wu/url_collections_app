import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import CollectionsPage from './pages/collectionPage'; // Import the Collections page
import RedirectPage from './pages/redirectPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page */}
          <Route path="/collections" element={<HomePage />} /> {/* TODO */}
          <Route path="/collections/:collectionId" element={<CollectionsPage />} /> {/* Collections page */}
          <Route path="/:shortUrl" element={<RedirectPage />} /> {/* Redirect page */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;