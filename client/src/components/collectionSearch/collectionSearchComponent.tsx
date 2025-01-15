import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { textboxStyles } from '../../styles/textboxStyles';

const CollectionSearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper sx={textboxStyles.paper}>
      <Typography sx={textboxStyles.title}>
        Search Page
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter your search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={textboxStyles.textField}
      />
      <Button
        sx={textboxStyles.button}
        variant="contained"
        onClick={handleSearch}
        className="searchButton"
      >
        Search
      </Button>
    </Paper>
  );
};

export default CollectionSearchComponent;