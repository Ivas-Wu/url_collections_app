import React, { useState } from 'react';
import { createCollection } from '../../services/collectionService';
import { Collection } from '../../models/collections.models';
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { textboxStyles } from '../../styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AnimatePresence, motion } from 'framer-motion';

const CreateCollection: React.FC = () => {
  const [collectionName, setCollectionName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [collectionUrl, setCollectionUrl] = useState<string | null>(null);
  const [showAdditionalSettings, setShowAdditionalSettings] = useState<boolean>(true);

  const handleCreateCollection = async (event: React.FormEvent) => {
    event.preventDefault();
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

  const getIcon = () => {
    return showAdditionalSettings ? <RemoveIcon /> : <AddIcon />
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCreateCollection(event);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + `/${collectionUrl}`).then(() => {
    }).catch((err) => {
    });
  };

  return (
    <Box>
      <Box sx={textboxStyles.titleContainer}>
        <Typography sx={textboxStyles.titleText}>
          Create a New Collection
        </Typography>
        <Box
          component="button"
          onClick={() => setShowAdditionalSettings(!showAdditionalSettings)}
          sx={textboxStyles.titleIcon}
        >
          {getIcon()}
        </Box>
      </Box>

      <Box component="form" onSubmit={handleCreateCollection} sx={textboxStyles.formBody} onKeyPress={handleKeyPress}>
        <TextField
          fullWidth
          label="Collection Name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Enter collection name"
          disabled={loading}
          sx={textboxStyles.textField}
        />

        <AnimatePresence>
          {showAdditionalSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <TextField
                fullWidth
                label="Placeholder"
                value={collectionName}
                // onChange={(e) => setCollectionName(e.target.value)}
                placeholder="placeholder"
                disabled={loading}
                sx={textboxStyles.textField}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            sx={textboxStyles.button}
            variant="contained"
            type="submit"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Creating...' : 'Create Collection'}
          </Button>
        </Box>
      </Box>

      {success && collectionUrl && (
        <Box sx={textboxStyles.link}>
          <a
            href={`/${collectionUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={textboxStyles.link.a}
          >
            {collectionUrl}
          </a>
          <IconButton onClick={handleCopy} sx={{ ml: 1 }}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateCollection;