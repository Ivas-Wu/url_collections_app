import React, { useState } from 'react';
import { createCollection } from '../../services/collectionService';
import { Collection } from '../../models/collections.models';
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';

const CreateCollection: React.FC = () => {
  const [collectionName, setCollectionName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [collectionUrl, setCollectionUrl] = useState<string | null>(null);

  const handleCreateCollection = async () => {
    if (!collectionName.trim()) {
      setError('Collection name cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const newUrl: Collection = await createCollection(collectionName);

      if (newUrl) {
        setCollectionUrl(`collections/${newUrl.collectionUrl}`);
        setSuccess(true);
        setCollectionName('');
      } else {
        throw new Error('Failed to create collection');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Collection
      </Typography>
      <TextField
        fullWidth
        label="Collection Name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        placeholder="Enter collection name"
        disabled={loading}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleCreateCollection}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Creating...' : 'Create Collection'}
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Collection created successfully!{' '}
          {collectionUrl && (
            <a href={collectionUrl} target="_blank" rel="noopener noreferrer">
              View Collection
            </a>
          )}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateCollection;