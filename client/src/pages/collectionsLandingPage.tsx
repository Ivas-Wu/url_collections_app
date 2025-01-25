import React from 'react';
import CollectionSearchComponent from '../components/collectionSearch/collectionSearchComponent';
import { Box } from '@mui/material';
import { pageBaseStyles } from './pageStyles';
import pattern from '../assets/dot-grid.webp';
import CreateCollection from '../components/collectionCreate/createCollectionComponent';

const CollectionsLandingPage: React.FC = () => {

  return (
    <Box
      sx={{
        ...pageBaseStyles.container,
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
      }}
    >
      <CreateCollection />
      <CollectionSearchComponent />
    </Box>
  );
};

export default CollectionsLandingPage;
