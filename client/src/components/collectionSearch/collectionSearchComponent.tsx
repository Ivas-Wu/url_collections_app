import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { textboxStyles } from '../../styles/textboxStyles';
import { findCollection } from '../../services/collectionService';

const CollectionSearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await findCollection(searchQuery);
      if (response.length === 1) {
        window.location.href += "/" + response[0].collectionUrl;
      }
    } catch {
      setError('Cannot find collection.');
    }
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

      {error && (
              <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
              >
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                  {error}
                </Alert>
              </Snackbar>
            )}
    </Paper>
  );
};

export default CollectionSearchComponent;