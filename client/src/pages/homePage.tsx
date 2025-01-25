import React from 'react';
import UrlShortenerForm from '../components/urlShortenerForm/urlShortenerForm';
import CreateCollection from '../components/collectionCreate/createCollectionComponent';
import { PageConstants } from '../constant/constants';
import { Box } from '@mui/material';
import pattern from '../assets/dot-grid.webp';
import { pageBaseStyles } from './pageStyles';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        ...pageBaseStyles.container,
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
      }}
    >
      <UrlShortenerForm parentComponent={PageConstants.HOME} />
      <CreateCollection />
    </Box>
  );
};

export default HomePage;