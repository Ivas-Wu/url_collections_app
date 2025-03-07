import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { textboxStyles } from '../../styles';
import { findCollection } from '../../services/collectionService';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CollectionSearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showAdditionalSettings, setShowAdditionalSettings] = useState<boolean>(true);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery) return;
    try {
      const response = await findCollection(searchQuery);
      if (response.length === 1) {
        window.location.href += "/" + response[0].collectionUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cannot find collection.');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  const getIcon = () => {
    return showAdditionalSettings ? <RemoveIcon /> : <AddIcon />
  }

  return (
    <Box>
      <Box sx={textboxStyles.titleContainer}>
        <Typography sx={textboxStyles.titleText}>
          Search Collections
        </Typography>
        <Box
          component="button"
          onClick={() => setShowAdditionalSettings(!showAdditionalSettings)}
          sx={textboxStyles.titleIcon}
        >
          {getIcon()}
        </Box>
      </Box>
      <Box component="form" onSubmit={handleSearch} sx={textboxStyles.formBody} onKeyPress={handleKeyPress}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by collection name or url tag"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
      </Box>

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
    </Box>
  );
};

export default CollectionSearchComponent;